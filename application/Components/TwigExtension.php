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
        return array('client' => $_SESSION['client'],
                    'exchange' => $_SESSION['exchange'],
                    'user' => $_SESSION['user']
        );
    }

    public function getFilters()
    {
        return [new \Twig_SimpleFilter('cast_to_array', array($this, 'to_array')),
                new \Twig_SimpleFilter('roundValue', array($this, 'roundValue'))
        ];
    }

    public function to_array($object){
        $array = array();
        foreach ($object as $key => $value) {
            $array[$key] = $value;
        }
        return $array;
    }

    public function roundValue($value){
//        if($value % 1 == 0){
//            return $value;
//        }else{
//            return round($value, 2);
//        }

        return round($value, 2);
    }
}