<?php

return [
    //Required
    'baseUrl'     => env('APP_BASEURL', 'http://quota.wau.travel'),

    //Basic
    'debug'       => (Boolean)env('APP_DEBUG', false),
    'error_level' => E_WARNING,
    'connected'   => (Boolean)env('APP_CONNECTED', false),
    'logdir'      => ROOT_PATH . '/storages/logs',
    'templatedir' => ROOT_PATH . '/templates',
    'defaultContentType'     => 'text/html',
    // Locale
    'timezone'    => 'UTC',
    'locale'      => 'en_US',
    'lang'        => 'en',
    'charset'     => 'UTF-8',
    'defaultContentType' => 'text/html',

    // Envrironment
    'hostaname'   => shell_exec('hostname'),

];