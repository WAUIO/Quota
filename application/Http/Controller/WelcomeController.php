<?php namespace App\Http\Controller;


use Wau\Http\Controller;

class WelcomeController extends Controller
{

    public function index(){
        if($_SESSION['user'] == null)
            return $this->app()->make('twig.view')->render('login.twig');
        else
            return $this->app()->make('twig.view')->render('info.twig');
    }
}
