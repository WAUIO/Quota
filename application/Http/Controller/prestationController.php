<?php namespace App\Http\Controller;


use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;
use App\Utils\RoomBase;

class prestationController extends Controller
{
    public function prestation(){

        return $this->app()->make('twig.view')->render('prestation.twig');
    }
}
