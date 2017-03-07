<?php
/**
 * Description :
 *
 *
 */

namespace CalculationResolver\CalculationTagResolver;


class Field extends AbstractCalculationTagResolver
{
    
    public function resolve ()
    {
        $components = [];
        preg_match("/\@\[[^\]]*\]\((field\_\w+)\)/", $this->itsTag, $components);
        $field_id  = (int)str_replace("field_", "", $components[1]);
        $itemField = $this->itsItem->fields->get($field_id);
        
        if (!is_null($itemField) && $itemField->type == 'calculation') {
            $temp_resolver = new \CalculationResolver\CalculationResolver();
            $itsAppField = \PodioAppField::get($this->itsItem->app->app_id, $field_id);
            return $temp_resolver->resolve($itsAppField, $this->itsItem);
    
        } else {
            return is_null($itemField) ? null : $itemField->humanized_value();
        }
    }
}