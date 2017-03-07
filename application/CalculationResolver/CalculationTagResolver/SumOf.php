<?php
/**
 * Description :
 *
 *
 */

namespace CalculationResolver\CalculationTagResolver;


class SumOf extends AbstractCalculationTagResolver
{
    
    public function resolve ()
    {
        $result = 0;
        $av = $this->getResolvedValues();
        
        array_walk($av, function ($val) use (&$result) {
            $result += $val;
        });
        
        return $result;
    }
}