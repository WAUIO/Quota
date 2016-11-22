<?php

$app->get('/room', 'App\Http\Controller\QuotaViewController@room_quota');
$app->get('/total', 'App\Http\Controller\QuotaViewController@total_quota');
$app->get('/dumpTable', 'App\Http\Controller\MigrationController@dumpTable');
$app->get('/', 'App\Http\Controller\MigrationController@index');

$app->group(['prefix'=>'/', 'middleware' => ['Wau\Podio\PodioAuthMiddleware'],
    function() use (&$app){
        $app->get('/migrate','App\Http\Controller\MigrationController@migrate');
    }
]);