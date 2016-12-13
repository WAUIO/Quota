<?php

$app->get('/', 'App\Http\Controller\infoController@info');
$app->get('/room', 'App\Http\Controller\QuotaViewController@room_quota');
$app->get('/getClient', 'App\Http\Controller\ClientController@getClient');
$app->get('/setClient', 'App\Http\Controller\ClientController@setClient');
$app->get('/prestation', 'App\Http\Controller\prestationController@prestation');
$app->get('/total', 'App\Http\Controller\QuotaViewController@total_quota');
$app->get('/dumpTable', 'App\Http\Controller\MigrationController@dumpTable');
$app->get('/index', 'App\Http\Controller\MigrationController@index');
$app->get('/saveClient', 'App\Http\Controller\infoController@saveClient');
$app->get('/client', 'App\Http\Controller\ClientController@clientInsert');

$app->group(['prefix' => '/webhook',
    function() use (&$app) {
        $app->WebhookController('/hookController', 'App\Http\Controller\hookController');
    }
]);

$app->group(['prefix'=>'/', 'middleware' => ['Wau\Podio\PodioAuthMiddleware'],
    function() use (&$app){
        $app->get('/migrate','App\Http\Controller\MigrationController@migrate');
    }
]);


