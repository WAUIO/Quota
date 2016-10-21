<?php namespace App\Http\Middleware;


use Wau\Http\Middleware\MiddlewareAbstract;

class AuthMiddleware extends MiddlewareAbstract
{
    public function handle($args = null){
        return true;
    }

}