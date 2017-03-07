<?php
/**
 * Description :
 *
 *
 */

namespace CalculationResolver\CalculationTagResolver;


class AllOf extends AbstractCalculationTagResolver
{
    
    public function resolve ()
    {
        $resolvedValues = $this->getResolvedValues();
        if (!empty($resolvedValues)) {
            return implode(",", $resolvedValues);
        } else {
            return "";
        }
    }
}