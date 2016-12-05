<?php



$app->get('/form', 'App\Http\Controller\WelcomeController@index');
$app->get('/money', 'App\Http\Controller\WelcomeController@currency');
$app->get('/info', 'App\Http\Controller\WelcomeController@info');
//$app->get('/', 'App\Http\Controller\QuotaViewController@index');
$app->get('/presta', 'App\Http\Controller\WelcomeController@prestationView');
$app->get('/room', 'App\Http\Controller\QuotaViewController@room_quota');
//$app->get('/prestation', 'App\Http\Controller\QuotaViewController@prestation_quota');
$app->get('/total', 'App\Http\Controller\QuotaViewController@total_quota');
$app->get('/house', 'App\Http\Controller\HouseController@select');
$app->get('/sgl', 'App\Http\Controller\SaveController@saveRoom');
$app->get('/quota', 'App\Http\Controller\SaveController@saveQuotaRoom');
$app->get('/resto', 'App\Http\Controller\SaveController@itBoard');
$app->get('/path', 'App\Http\Controller\HouseController@dataRoom');
$app->get('/brd', 'App\Http\Controller\SaveController@priceBoard');
$app->get('/rest', 'App\Http\Controller\HouseController@dataRestaurant');
$app->get('/', 'App\Http\Controller\QuotaViewController@index');
$app->get('/information', 'App\Http\Controller\infoController@info');
git$app->get('/prestation', 'App\Http\Controller\prestationController@prestation');

$app->get('/dumpTable', 'App\Http\Controller\MigrationController@dumpTable');
$app->get('/currency', 'App\Http\Controller\HouseController@currency');

$app->get('/client', 'App\Http\Controller\ClientController@clientInsert');

$app->group(['prefix'=>'/', 'middleware' => ['Wau\Podio\PodioAuthMiddleware'],
    function() use (&$app){
        $app->get('/migrate','App\Http\Controller\MigrationController@migrate');
    }
]);


$app->group(['prefix' => '/webhook',
    function() use (&$app) {

        $app->WebhookController('/hookController', 'App\Http\Controller\hookController');
    }
]);

