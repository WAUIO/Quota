<?php

$app->get('/[home]', 'App\Http\Controller\WelcomeController@index');

/**
 * Developper resources
 * Examples of grouped routing and useing middlewares
 *
$app->group(['prefix' => '/developer', 'middleware' => ['Wau\Podio\PodioOAuthMiddleware'],
             function() use (&$app) {
                 $app->get(['/server.info', 'server.info'],
                     'Wau\Http\Controller\DeveloperController@serverInfo'
                 );
                 $app->get(['/app', 'developer.app'],
                     'Wau\Http\Controller\DeveloperController@printApp'
                 );
                 $app->get(['/logs', 'developer.logs'],
                     'Wau\Http\Controller\DeveloperController@listLog'
                 );
                 $app->get(['/logs-{name}', 'developer.log'],
                     'Wau\Http\Controller\DeveloperController@viewLog'
                 );
             }
    ]
);
 *
 */