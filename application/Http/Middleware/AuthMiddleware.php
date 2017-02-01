<?php namespace App\Http\Middleware;

use Wau\Http\Middleware\MiddlewareAbstract;

class AuthMiddleware extends MiddlewareAbstract
{

    public function handle($args = null)
    {
        return !($_SESSION['user'] == null);
    }

    public function down()
    {
        return $this->app->abort($this->app()->make('twig.view')->render('login.twig'), 200);
    }
}