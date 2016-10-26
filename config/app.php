<?php

return [
<<<<<<< HEAD

    //Required
    'baseUrl'     => env('APP_BASEURL', 'http://quota.wau.travel'),

=======
    
    //Required
    'baseUrl'     => env('APP_BASEURL', 'http://quota.wau.travel'),
    
>>>>>>> 5ec53b15887eef6db8ffbaefd7b3f405e8c26a40
    //Basic
    'debug'       => (Boolean)env('APP_DEBUG', false),
    'error_level' => E_WARNING,
    'connected'   => (Boolean)env('APP_CONNECTED', false),
    'logdir'      => ROOT_PATH . '/storages/logs',
    'templatedir' => ROOT_PATH . '/templates',
<<<<<<< HEAD
    'defaultContentType'     => 'text/html',

=======
	'defaultContentType'     => 'text/html',
    
>>>>>>> 5ec53b15887eef6db8ffbaefd7b3f405e8c26a40
    // Locale
    'timezone'    => 'UTC',
    'locale'      => 'en_US',
    'lang'        => 'en',
    'charset'     => 'UTF-8',
    'defaultContentType' => 'text/html',
<<<<<<< HEAD

    // Envrironment
    'hostname'   => shell_exec('hostname'),
=======
    
    // Envrironment
    'hostaname'   => shell_exec('hostname'),

>>>>>>> 5ec53b15887eef6db8ffbaefd7b3f405e8c26a40
];