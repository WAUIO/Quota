<?php
/**
 * Description :
 *
 *
 */

namespace CalculationResolver\CalculationTagResolver;


class Inner extends AbstractCalculationTagResolver
{
    public function resolve ()
    {
        $components    = [];
        preg_match("/\@\[[^\]]*\]\((\w+)\)/", $this->itsTag, $components);
        $components[1] = preg_replace("/item_/", "", $components[1], 1);
        
        $result = $this->itsItem->{$components[1]};
        
        if ($result instanceof \DateTime) {
            $result = $result->format("D M d Y H:i:s eO");
        } elseif ($result instanceof \PodioByLine) {
            $result = $result->name;
        }
        
        return $result;
    }
}