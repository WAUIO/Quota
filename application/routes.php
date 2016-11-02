<?php

$app->get('/', 'App\Http\Controller\QuotaViewController@index');
$app->get('/information', 'App\Http\Controller\infoController@info');
$app->get('/prestation', 'App\Http\Controller\prestationController@prestation');
