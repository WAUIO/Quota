<?php

$app->get('/', 'App\Http\Controller\QuotaViewController@getExchange');
$app->get('/room', 'App\Http\Controller\QuotaViewController@room_quota');
$app->get('/total', 'App\Http\Controller\QuotaViewController@total_quota');
