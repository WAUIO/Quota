<?php namespace App\Http\Controller;


use Wau\Http\Controller;


class WelcomeController extends Controller
{

    //function index interface (list all workspace available for the users
    public function index()
    {
        return $this->app()->make('twig.view')->render('index.twig');
    }

}