<?php namespace App\Http\Controller;


use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;
use App\Utils\RoomBase;

class infoController extends Controller
{
    public function info(){
        return $this->app()->make('twig.view')->render('info.twig');    }
}
