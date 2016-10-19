<?php namespace App\Http\Controller;


use Wau\Http\Controller;

class WelcomeController extends Controller
{

    public function index(){
//      return "Welcome to Wau Framework for Podio Application";
        return  $this->app()->make('twig.view')->render('quota-view/index.twig');
    }

}