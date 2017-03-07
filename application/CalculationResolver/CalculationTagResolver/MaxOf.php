<?php
/**
 * Description :
 *
 *
 */

namespace CalculationResolver\CalculationTagResolver;


class MaxOf extends AbstractCalculationTagResolver
{
    public function resolve ()
    {
        $result = max($this->getResolvedValues());
        
        return ($result===false)? null : $result;
    }
}