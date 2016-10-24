<?php

$app->get('/[home]', 'App\Http\Controller\WelcomeController@index');
$app->get('/info', 'App\Http\Controller\WelcomeController@info');



