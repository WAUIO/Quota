<?php namespace App\Components;

/**
 * Class TwigExtension
 *
 * http://twig.sensiolabs.org/doc/advanced.html
 *
 * @package App\Components
 */
class TwigExtension extends \Twig_Extension
{
    public function getName() {
        return "WAU Hook Handler Twig Extension";
    }
}