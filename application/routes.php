<?php

$app->group(['prefix'=>'/', 'middleware' => ['App\Http\Middleware\AuthMiddleware'],
    function() use (&$app){
        $app->get('/form', 'App\Http\Controller\WelcomeController@index');

    }
]);

$app->get('/[home]', 'App\Http\Controller\WelcomeController@index');
$app->get('/info', 'App\Http\Controller\WelcomeController@info');