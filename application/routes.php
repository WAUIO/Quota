<?php

//webhook
$app->group(['prefix' => '/webhook',
    function() use (&$app) {
        $app->WebhookController('/hookController', 'App\Http\Controller\HookController');
    }
]);

$app->group(['prefix'=>'/', 'middleware' => ['App\Http\Middleware\AuthMiddleware'],
    function() use (&$app){

    //HomeController
        $app->get('/', 'App\Http\Controller\HomeController@home');
        $app->get('/duplicateRegistration', 'App\Http\Controller\HomeController@duplicateRegistration');
        $app->get('/deleteRegistration', 'App\Http\Controller\HomeController@deleteRegistration');

    //UserController
        $app->get('/logout', 'App\Http\Controller\UserController@logout');

    //ClientController
        $app->get('/getClient', 'App\Http\Controller\ClientController@getClient');
        $app->get('/setClient', 'App\Http\Controller\ClientController@setClient');
        $app->get('/addClient', 'App\Http\Controller\ClientController@addClient');
        $app->get('/saveClient', 'App\Http\Controller\ClientController@saveClient');

    //PrestationController
        $app->get('/quotaPrestation', 'App\Http\Controller\PrestationController@quotaPrestation');
        $app->get('/prestation', 'App\Http\Controller\PrestationController@prestation');
        $app->post('/savePrestation', 'App\Http\Controller\PrestationController@savePrestation');
        $app->post('/updatePrestation', 'App\Http\Controller\PrestationController@updatePrestation');
        $app->get('/deleteQuotaPrestation', 'App\Http\Controller\PrestationController@deleteQuotaPrestation');

    //RoomController
        $app->get('/quotaRoom', 'App\Http\Controller\RoomController@quotaRoom');
        $app->post('/saveQuotaRoom', 'App\Http\Controller\RoomController@saveQuotaRoom');
        $app->get('/deleteQuotaRoom', 'App\Http\Controller\RoomController@deleteQuotaRoom');

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