<?php
/**
 * Description :
 *
 *
 */

namespace CalculationResolver\CalculationTagResolver;


class AvgOf extends AbstractCalculationTagResolver
{
    
    public function resolve ()
    {
        $values = $this->getResolvedValues();
        $result = 0;
        $count  = count($values);
    
        array_walk($values, function ($val) use (&$result) {
            $result += $val;
        });
    
        return ($count < 1)? 0 : ($result/$count);
    }
}