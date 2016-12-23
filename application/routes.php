<?php

$app->get('/money', 'App\Http\Controller\WelcomeController@currency');

$app->get('/quotaprestation', 'App\Http\Controller\prestationController@prestationView');
$app->get('/room', 'App\Http\Controller\QuotaViewController@room_quota');

$app->get('/getClient', 'App\Http\Controller\ClientController@getClient');
$app->get('/setClient', 'App\Http\Controller\ClientController@setClient');
$app->get('/total', 'App\Http\Controller\QuotaViewController@total_quota');
$app->get('/house', 'App\Http\Controller\HouseController@select');
$app->get('/priceroom', 'App\Http\Controller\SaveController@priceRoom');
$app->get('/savequotustaroom', 'App\Http\Controller\SaveController@saveQuotaRoom');
$app->get('/saveprestation', 'App\Http\Controller\SaveController@saveQuotaPrestation');
$app->get('/showprestation', 'App\Http\Controller\prestationController@showQuotaPrestation');
$app->get('/resto', 'App\Http\Controller\SaveController@itBoard');
$app->get('/listroom', 'App\Http\Controller\HouseController@dataRoom');
$app->get('/priceboard', 'App\Http\Controller\SaveController@priceBoard');
$app->get('/listboard', 'App\Http\Controller\HouseController@dataRestaurant');
$app->get('/information', 'App\Http\Controller\infoController@info');
$app->get('/prestation', 'App\Http\Controller\prestationController@prestation');

$app->get('/dumpTable', 'App\Http\Controller\MigrationController@dumpTable');

$app->get('/currency', 'App\Http\Controller\HouseController@currency');

$app->get('/saveClient', 'App\Http\Controller\infoController@clientInsert');
$app->get('/index', 'App\Http\Controller\MigrationController@index');

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
