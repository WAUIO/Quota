<?php
/**
 * Description :
 *
 *
 */

namespace CalculationResolver\CalculationTagResolver;

use CalculationResolver\CalculationTagResolverNotImplemented;

trait CanDetectTagAndMakeResolverTrait
{
    /**
     * @param $tag
     *
     * @return AbstractCalculationTagResolver
     * @throws CalculationTagResolverNotImplemented
     */
    protected function detectTagTypeAndMakeResolver ($tag)
    {
        if (preg_match("/\@\[([^\]]*)\]\(field\_\w+\)/", $tag)) {
            return new Field($tag, $this->currentItem);
        }
        
        if (preg_match("/\@\[(All of[^\]]*)\]\((in\_|out\_)\w+\)/", $tag)) {
            return new AllOf($tag, $this->currentItem);
        }
    
        if (preg_match("/\@\[(Sum of[^\]]*)\]\((in\_|out\_)\w+\)/", $tag)) {
            return new SumOf($tag, $this->currentItem);
        }
    
        if (preg_match("/\@\[(Avg of[^\]]*)\]\((in\_|out\_)\w+\)/", $tag)) {
            return new AvgOf($tag, $this->currentItem);
        }
    
        if (preg_match("/\@\[(Min of[^\]]*)\]\((in\_|out\_)\w+\)/", $tag)) {
            return new MinOf($tag, $this->currentItem);
        }
    
        if (preg_match("/\@\[(Max of[^\]]*)\]\((in\_|out\_)\w+\)/", $tag)) {
            return new MaxOf($tag, $this->currentItem);
        }
    
        if (preg_match("/\@\[(Created[^\]]*)\]\(item\_\w+\)/", $tag)) {
            return new Inner($tag, $this->currentItem);
        }
    
        if (preg_match("/\@\[(Unique[^\]]*)\]\(item\_\w+\)/", $tag)) {
            return new Inner($tag, $this->currentItem);
        }
    
    
        throw new CalculationTagResolverNotImplemented();
    }
}