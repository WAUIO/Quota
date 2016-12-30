<?php

//webhook
$app->group(['prefix' => '/webhook',
    function() use (&$app) {
        $app->WebhookController('/hookController', 'App\Http\Controller\HookController');
    }
]);

$app->group(['prefix'=>'/', 'middleware' => ['App\Http\Middleware\AuthMiddleware'],
    function() use (&$app){

        //InfoController
        $app->get('/', 'App\Http\Controller\InfoController@info');
        $app->get('/information', 'App\Http\Controller\InfoController@info');
        $app->get('/saveClient', 'App\Http\Controller\InfoController@clientInsert');

        //PrestationController
        $app->get('/quotaprestation', 'App\Http\Controller\PrestationController@prestationView');
        $app->get('/prestation', 'App\Http\Controller\PrestationController@prestation');

        //QuotaViewController
        $app->get('/room', 'App\Http\Controller\QuotaViewController@room_quota');
        $app->get('/total', 'App\Http\Controller\QuotaViewController@total_quota');

        //ClientController
        $app->get('/getClient', 'App\Http\Controller\ClientController@getClient');
        $app->get('/setClient', 'App\Http\Controller\ClientController@setClient');

        //SaveController
        $app->get('/sgl', 'App\Http\Controller\SaveController@saveRoom');
        $app->get('/savequotaroom', 'App\Http\Controller\SaveController@saveQuotaRoom');
        $app->get('/brd', 'App\Http\Controller\SaveController@priceBoard');
        $app->get('/saveprestation', 'App\Http\Controller\SaveController@saveQuotaPrestation');
        $app->get('/otherboard', 'App\Http\Controller\SaveController@itBoard');
        $app->get('/priceboard', 'App\Http\Controller\SaveController@priceBoard');

        //HouseController
        $app->get('/house', 'App\Http\Controller\HouseController@select');
        $app->get('/getAllHouseData', 'App\Http\Controller\HouseController@getAllHouseData');

        //MigrationController
        $app->get('/dumpTable', 'App\Http\Controller\MigrationController@dumpTable');
    }
]);

$app->group(['prefix'=>'/', 'middleware' => ['Wau\Podio\PodioAuthMiddleware'],
    function() use (&$app){
        $app->get('/migrate','App\Http\Controller\MigrationController@migrate');
        $app->get('/login', 'App\Http\Controller\LoginController@login');
    }
]);
