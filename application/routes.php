<?php

//webhook
$app->group(['prefix' => '/webhook',
    function() use (&$app) {
        $app->WebhookController('/hookController', 'App\Http\Controller\HookController');
    }
]);

$app->group(['prefix'=>'/', 'middleware' => ['App\Http\Middleware\AuthMiddleware'],
    function() use (&$app){
//UserController
        $app->get('/logout', 'App\Http\Controller\UserController@logout');

//ClientController
        $app->get('/getClient', 'App\Http\Controller\ClientController@getClient');
        $app->get('/setClient', 'App\Http\Controller\ClientController@setClient');
        $app->get('/', 'App\Http\Controller\ClientController@home');
        $app->get('/addClient', 'App\Http\Controller\ClientController@addClient');
        $app->get('/saveClient', 'App\Http\Controller\ClientController@saveClient');

//PrestationController
        $app->get('/quotaPrestation', 'App\Http\Controller\PrestationController@quotaPrestation');
        $app->get('/prestation', 'App\Http\Controller\PrestationController@prestation');
        $app->get('/savePrestation', 'App\Http\Controller\PrestationController@savePrestation');

//RoomController
        $app->get('/quotaRoom', 'App\Http\Controller\RoomController@quotaRoom');
        $app->get('/saveQuotaRoom', 'App\Http\Controller\RoomController@saveQuotaRoom');

//TotalController
        $app->get('/quotaTotal', 'App\Http\Controller\TotalController@quotaTotal');

//HouseController
        $app->get('/editRoom', 'App\Http\Controller\HouseController@editRoom');
        $app->get('/getAllHouseData', 'App\Http\Controller\HouseController@getAllHouseData');
    }
]);

$app->group(['prefix'=>'/', 'middleware' => ['Wau\Podio\PodioAuthMiddleware'],
    function() use (&$app){
        $app->get('/migrate','App\Http\Controller\MigrationController@migrate');
        $app->post('/authenticate', 'App\Http\Controller\UserController@authenticate');
    }
]);