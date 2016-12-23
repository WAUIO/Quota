<?php namespace App\Components;

use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

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

    public function getGlobals(){
        return ['client' => $_SESSION['client'], 'exchange' => $_SESSION['exchange'], 'user' => $_SESSION['user']];
    }
}