<?php

$app->get('/', 'App\Http\Controller\QuotaViewController@index');
$app->get('/information', 'App\Http\Controller\infoController@info');
$app->get('/prestation', 'App\Http\Controller\prestationController@prestation');


$app->group(['prefix' => '/webhook',
    function() use (&$app) {

        $app->WebhookController('/hookController', 'App\Http\Controller\hookController');
    }
]);
$app->group(['prefix'=>'/', 'middleware' => ['Wau\Podio\PodioAuthMiddleware'],
    function() use (&$app){
        $app->get('/migrate','App\Http\Controller\hookController@itemCreate');
    }
]);