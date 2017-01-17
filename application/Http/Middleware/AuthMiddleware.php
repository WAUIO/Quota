<?php namespace App\Http\Middleware;


use Wau\Http\Middleware\MiddlewareAbstract;

class AuthMiddleware extends MiddlewareAbstract{

    public function handle($args = null){
        if ($_SESSION['user'] == null) {
            return $this->app()->abort($this->app()->make('twig.view')->render('login.twig'));
        } else {
            return true;
        }
    }
}