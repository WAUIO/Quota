<?php

$app->get('/form', 'App\Http\Controller\WelcomeController@index');
$app->get('/money', 'App\Http\Controller\WelcomeController@currency');
$app->get('/info', 'App\Http\Controller\WelcomeController@info');
//$app->get('/', 'App\Http\Controller\QuotaViewController@index');
$app->get('/presta', 'App\Http\Controller\WelcomeController@prestationView');
$app->get('/room', 'App\Http\Controller\QuotaViewController@room_quota');
$app->get('/total', 'App\Http\Controller\QuotaViewController@total_quota');
$app->get('/house', 'App\Http\Controller\HouseController@select');
$app->get('/path', 'App\Http\Controller\HouseController@dataRoom');
$app->get('/rest', 'App\Http\Controller\HouseController@dataRestaurant');

    //$app->group(['prefix' => '/', 'middleware' => ['App\Http\Middleware\AuthMiddleware'],
    //    function() use (&$app) {
    //
//    }]);