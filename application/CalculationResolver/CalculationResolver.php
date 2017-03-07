<?php
/**
 * Description :
 *
 * Used for doing the calculation field job based on an item
 *  and the fields config
 */

namespace CalculationResolver;


use CalculationResolver\CalculationTagResolver\CanDetectTagAndMakeResolverTrait;

class CalculationResolver
{
    use CanDetectTagAndMakeResolverTrait;
    
    protected $currentItem;
    protected $currentField;
    protected $currentCode;
    protected $preprocessedCode;
    protected $podio_special_tags_pattern = "/\@\[([^\]]*)\]\(([^\)]*)\)?/";
    protected $app_repository = [];
    protected $executefilepath;
    protected $calc_return_type;
    protected $decimals_output;
    
    
    /**
     * Main function that the end user will use
     * Orders the object to resolve a calculation field
     * As a first parameter, prefer using a PodioApp field
     *  instead of a PodioItem field to avoid waiting for the
     *  calculation to actually get a value. Though, PodioItem field
     *  can still be used but the resolve would fail if the calculation
     *  is not resolved on the Podio GUI yet.
     *
     * @param \PodioObject $field -> prefer a PodioApp field
     * @param \PodioItem   $item  -> the item on which we want the calc to be resolved
     *
     * @return mixed
     */
    public function resolve (\PodioObject $field, \PodioItem $item, $distant_resolver_endpoint = "")
    {
        $this->setCurrentItem($item);
        $this->setCurrentField($field);
        
        $this->preprocess();
        $this->mergeCodeWithCommand($this->preprocessedCode);
        
        //send the code to nodejs and compile
        if ($distant_resolver_endpoint == "") { //local execution
            $result = $this->execute();
        } else {
            $code   = preg_replace("/\r|\n/", "", str_replace('"', '\"', $this->preprocessedCode));
            $result = $this->sendCurlDataToEndpoint( //distant server execution
                $distant_resolver_endpoint,
                $code
            );
        }
        
        return $result[0];
    }
    
    /**
     * @param $endpoint
     * @param $data
     *
     * @return array
     */
    protected function sendCurlDataToEndpoint ($endpoint, $data)
    {
        $ch = curl_init($endpoint);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 0);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                           'Content-Type: text/plain',
                           'Content-Length: ' . strlen($data))
        );
        $result = curl_exec($ch);
        $err = curl_error($ch);
        $result = json_decode($result, true);
        //comment this if you wanna see the output command
        @unlink($this->executefilepath);
        
        curl_close($ch);
        
        return $result;
    }
    
    /**
     * Serves to write the JS compilation file
     *
     * The compilation works as following:
     *  The code takes the final JS code from the calculation
     *  with already interpreted tags (meaning no @values anymore)
     *  and writes it in a js file.
     * To compile we just run the js file with the node program.
     *
     * @param $code -> this is the already preprocessed code without Podio @tags
     *
     * @return string
     */
    protected function mergeCodeWithCommand ($code)
    {
        $this->executefilepath = dirname(__FILE__) . "/" . time() . ".js";
        $code                  = preg_replace("/\r|\n/", "", str_replace('"', '\"', $code));
        $command               = "console.log(eval(\"$code\"));";
        file_put_contents($this->executefilepath, $command);
        
        return $command;
    }
    
    
    /**
     * Take the JS compilation file and execute it through node program
     * returns the output, and delete the file so it is not polluting
     *
     * @return array
     */
    protected function execute ()
    {
        $command = "nodejs " . $this->executefilepath;
        $result  = [];
        exec($command, $result);
        
        //comment this if you wanna see the output command
        @unlink($this->executefilepath);
        
        return $result;
    }
    
    /**
     * Setter for current item. This is the item on which we
     *  want to resolve the calculation field.
     *
     * @param \PodioItem $item
     */
    protected function setCurrentItem (\PodioItem $item)
    {
        $this->currentItem = $item;
    }
    
    /**
     * Setter for the current field. This is the calculation field
     *  we want to resolve
     *
     * @param \PodioObject $field
     *
     * @throws NotACalculationException
     * @throws NotAFieldOfThisApp
     */
    protected function setCurrentField (\PodioObject $field)
    {
        if ($field->type != "calculation") {
            throw new NotACalculationException("The field passed is not a calculation field");
        }
        
        if (
        !$this->fieldExistsInApp(
            $this->currentItem->app->app_id,
            $field
        )
        ) {
            throw new NotAFieldOfThisApp("The field is not a field of the passed app");
        }
        
        $this->currentField     = $field;
        $this->currentCode      = $field->config['settings']['script'];
        $this->calc_return_type = $field->config['settings']['return_type'];
        $this->decimals_output  = array_key_exists('decimals', $field->config['settings']) ?
            $field->config['settings']['decimals'] : -1;
    }
    
    /**
     * Determine if a field exists in a given app
     *
     * @param              $app_id
     * @param \PodioObject $field
     *
     * @return bool
     */
    protected function fieldExistsInApp ($app_id, \PodioObject $field)
    {
        $app         = $this->getApp($app_id);
        $fieldExists = false;
        foreach ($app->fields as $one_field) {
            if ($field->field_id == $one_field->field_id && $one_field->status == 'active') {
                $fieldExists = true;
                break;
            }
        }
        
        return $fieldExists;
    }
    
    /**
     * Special getter for a Podioapp that remembers the apps
     * it already got and not query Podio anymore for the apps
     * already got. Useful when using the same resolver to do multiple
     * resolutions on different items.
     *
     * @param $app_id
     *
     * @return mixed
     */
    protected function getApp ($app_id)
    {
        if (!array_key_exists($app_id, $this->app_repository)) {
            $app                           = \PodioApp::get($app_id);
            $this->app_repository[$app_id] = $app;
        }
        
        return $this->app_repository[$app_id];
    }
    
    /**
     * Used to produce the compilation JS code.
     * It is the code from the calculation field config but
     * with all the special podio @tags already resolved.
     * So this is PLAIN JS code that nodeJS can compile.
     *
     */
    protected function preprocess ()
    {
        //fetch all podio special tags
        $allSpecialTags         = $this->getAllSpecialTags($this->currentCode);
        $this->preprocessedCode = $this->processSpecialTags($this->currentCode, $allSpecialTags);
    }
    
    /**
     * Takes the original calculation script in parameter and strip
     * all special podio @tags from it and return them.
     *
     * @param $script
     *
     * @return array
     */
    public function getAllSpecialTags ($script)
    {
        $result = [];
        preg_match_all($this->podio_special_tags_pattern, $script, $result);
        
        return $result;
    }
    
    /**
     * The main goal of this method is to interpret
     * the podio special @tags and replace them with
     * their actual values
     *
     * @param $code
     * @param $tags
     *
     * @return mixed
     */
    protected function processSpecialTags ($code, $tags)
    {
        $resolved_tags = [];
        
        foreach ($tags[0] as $tag) {
            /**
             * Use the tag detector to know which tagresolver
             * to instanciate in order to do the interpretation correctly.
             *
             * This is currently supporting:
             * Field tags (field in the same app)
             * All of
             * Sum of
             * Avg of
             * Max of
             * Min of
             * created on
             * created by
             * uniqueid
             *
             * those tags are all supported for both incoming and outgoing relationships
             */
            $resolver         = $this->detectTagTypeAndMakeResolver($tag);
            $resolver->output = $this->calc_return_type;
            
            if ($this->decimals_output >= 0) {
                $resolver->decimals_output = $this->decimals_output;
            }
            
            $final_tag = $resolver->resolve();
            
            //if the output should be a text
            if (in_array($this->calc_return_type, ["text", "date"])) {
                
                if (is_null($final_tag)) {
                    $final_tag = "null";
                }
                
                $final_tag = '"' . $final_tag . '"';
                
            } else {
                
                if (is_null($final_tag)) {
                    $final_tag = 0;
                }
            }
            
            $resolved_tags [] = $final_tag;
        }
        
        $preprocessed_code = $code;
        
        //do the replacement
        for ($i = 0; $i < count($tags[0]); $i++) {
            $preprocessed_code = str_replace($tags[0][$i], $resolved_tags[$i], $preprocessed_code);
        }
        
        return $preprocessed_code;
    }
    
    /**
     * Arbitrary compile a given JS code
     *
     * useful when the nodejs installation is
     * outside the main php env
     *
     * @param $jsCode
     *
     * @return array
     */
    public function compileJs ($jsCode)
    {
        $this->mergeCodeWithCommand($jsCode);
        
        $result = $this->execute();
        
        //comment this if you wanna see the output command
        @unlink($this->executefilepath);
        
        return $result;
    }
    
}

class NotACalculationException extends \Exception
{
}

class NotAFieldOfThisApp extends \Exception
{
}

class CalculationTagResolverNotImplemented extends \Exception
{
}