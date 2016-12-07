<?php

$app->get('/room', 'App\Http\Controller\QuotaViewController@room_quota');
$app->get('/getClient', 'App\Http\Controller\QuotaViewController@listClient');
$app->get('/prestation', 'App\Http\Controller\prestationController@prestation');
$app->get('/total', 'App\Http\Controller\QuotaViewController@total_quota');
$app->get('/dumpTable', 'App\Http\Controller\MigrationController@dumpTable');
$app->get('/index', 'App\Http\Controller\MigrationController@index');
$app->get('/', 'App\Http\Controller\infoController@info');

$app->group(['prefix'=>'/', 'middleware' => ['Wau\Podio\PodioAuthMiddleware'],
    function() use (&$app){
        $app->get('/migrate','App\Http\Controller\MigrationController@migrate');
    }
]);


