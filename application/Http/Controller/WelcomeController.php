<?php namespace App\Http\Controller;


use Wau\Http\Controller;

class WelcomeController extends Controller
{

    public function index(){
        return $this->app()->make('twig.view')->render('form.twig');
    }

    public function info(){
        return $this->app()->make('twig.view')->render('info.twig');
    }
    public function prestationView(){
        return $this->app()->make('twig.view')->render('quotaprest.twig');
    }



}
