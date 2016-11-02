<?php

//$app->group(['prefix'=>'/', 'middleware' => ['App\Http\Middleware\AuthMiddleware'],
//    function() use (&$app){
//       $app->get('/form', 'App\Http\Controller\WelcomeController@index');
//
//
//    }
//]);

$app->get('/form', 'App\Http\Controller\WelcomeController@index');
$app->get('/money', 'App\Http\Controller\WelcomeController@currency');
$app->get('/info', 'App\Http\Controller\WelcomeController@info');
$app->get('/', 'App\Http\Controller\QuotaViewController@index');
$app->get('/presta', 'App\Http\Controller\WelcomeController@prestationView');

