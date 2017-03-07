<?php
/**
 * Description :
 *
 *
 */

namespace CalculationResolver\CalculationTagResolver;


class MinOf extends AbstractCalculationTagResolver
{
    
    public function resolve ()
    {
        $result = min($this->getResolvedValues());
    
        return ($result===false)? null : $result;
    }
}