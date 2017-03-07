<?php
/**
 * Description :
 *
 *
 */

namespace CalculationResolver\CalculationTagResolver;

/*
 *
 * Code pre-rendering for All of
 *
 * @[All of something](out_xxxxxxxx_xxxxxxx) out_fieldInOutgoing_fieldInCurrentAppThatReferenceTheOutgoing
 * @[All of something](in_xxxxxxxx_xxxxxxx) in_fieldInIncoming_fieldInIncomingThatReferenceTheCurrentApp
 *
 */
/*
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
 * All those tags are supported for bot incoming and outgoing relationships
 */

abstract class AbstractCalculationTagResolver
{
    /**
     * Force child classes to have the resolve method
     *
     * @return mixed
     */
    abstract public function resolve ();
    
    protected $itsTag;
    protected $itsItem;
    protected $isOutgoing;
    public $output;
    public $decimals_output;
    
    
    public function __construct ($tag, \PodioItem $item)
    {
        $this->itsTag  = $tag;
        $this->itsItem = $item;
    }
    
    protected function separateInOutComponents ()
    {
        //separate tags
        $components = [];
        preg_match("/\((out|in)\_(\w+\_)?(\d+)\_(\d+)\)/", $this->itsTag, $components);
        
        return $components;
    }
    
    protected function getResolvedValues ()
    {
        if (preg_match("/\(out\_(\w+\_)?\d+\_\d+\)/", $this->itsTag)) {
            return $this->resolveOutgoing();
        } else {
            return $this->resolveIncoming();
        }
    }
    
    protected function resolveOutgoing ()
    {
        //separate tags
        $this->isOutgoing                          = true;
        $components                                = $this->separateInOutComponents();
        $fieldInOutgoing                           = (int)$components[3];
        $fieldInCurrentAppThatReferenceTheOutgoing = (int)$components[4];
        
        //try to get the outgoing items first
        $out_values      = [];
        $out_item_ids    = [];
        $outgoing_app_id = 0;
        foreach ($this->itsItem->fields->get($fieldInCurrentAppThatReferenceTheOutgoing)->values as $item) {
            //pay attention to only get the interesting data and not storing big items
            //in array
            $outgoing_item   = \PodioItem::get($item->item_id);
            $out_item_ids [] = $outgoing_item->item_id;
            $out_values []   = $outgoing_item->fields->get($fieldInOutgoing);
            $outgoing_app_id = $outgoing_item->app->app_id;
        }
        
        //get the interesting field from the outgoings
        //and accessory send the app_id
        $i = 0;
        
        return array_values(array_filter(array_map(function ($val) use ($outgoing_app_id, $out_item_ids, &$i) {
            $value = $this->interpretFieldValue($val, $outgoing_app_id, $out_item_ids[$i]);
            $i++;
            
            return $value;
        }, $out_values)));
    }
    
    protected function resolveIncoming ()
    {
        //separate tags
        $this->isOutgoing                          = false;
        $components                                = $this->separateInOutComponents();
        $fieldToOutputInIncoming                   = (int)$components[3];
        $fieldInIncomingThatReferenceTheCurrentApp = (int)$components[4];
        
        //get the desired incoming items first
        $incomingItems = \PodioItem::get_references_by_field(
            $this->itsItem->item_id,
            $fieldInIncomingThatReferenceTheCurrentApp,
            [
                //@todo need to test this and fix if not working
                //because the data returned by podio does not
                //mention the total count
                //A solution may be looping until it returns nothing more
                "limit" => 5000 //not sure this would work by the way..
            ]
        );
        
        //get the interesting field from the incomings
        return array_values(array_filter(array_map(function ($val) use ($fieldToOutputInIncoming) {
            $item  = \PodioItem::get($val->item_id);
            $field = $item->fields->get($fieldToOutputInIncoming);
            
            //accessory pass the app id
            return $this->interpretFieldValue($field, $item->app->app_id, $val->item_id);
        }, $incomingItems)));
    }
    
    protected function interpretFieldValue (\PodioItemField $field = null, $app_id = 0, $item_id_to_resolve = 0)
    {
        if (is_null($field)) {
            return null;
        }
        
        switch ($field->type) {
            case 'money':
                $output = (float)$field->values['value'];
                break;
            case 'number':
                $output = (float)$field->values;
                break;
            case 'duration':
                $output = (float)($field->values / 3600);
                break;
            case 'progress':
                $output = ($this->output == 'number' && $this->isOutgoing) ? (float)($field->values / 100) : (float)$field->values;
                break;
            case 'calculation':
                $temp_resolver = new \CalculationResolver\CalculationResolver();
                //prefer the app field version as we do not know if the item version already has
                //updated value on it
                $itsAppField     = \PodioAppField::get($app_id, $field->field_id);
                $item_to_resolve = \PodioItem::get($item_id_to_resolve);
                $output          = $temp_resolver->resolve($itsAppField, $item_to_resolve);
                break;
            default:
                $output = $field->humanized_value();
                break;
        }
        
        //take output decimals in account if the output should be a number
        if ($this->decimals_output >= 0 && $this->output == 'number') {
            $output = round($output, $this->decimals_output);
        } elseif (($this->decimals_output < 0 && $this->output == 'number') || (in_array($field->type, [
                    'money',
                    'number',
                    'duration',
                    'progress',
                ]) && $this->output == "text")
        ) {
            $output = round($output, 4);
        }
        
        return $output;
    }
}