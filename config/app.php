<?php

return [
<<<<<<< HEAD


    //Required
    'baseUrl'     => env('APP_BASEURL', 'http://quota.wau.travel'),
=======
    
    //Required
    'baseUrl'     => env('APP_BASEURL', 'http://quota.wau.travel'),
    
>>>>>>> c2b93bfe3bc79d87fe043bba5487b45f82bb3c66
    //Basic
    'debug'       => (Boolean)env('APP_DEBUG', false),
    'error_level' => E_ALL,
    'connected'   => (Boolean)env('APP_CONNECTED', false),
    'logdir'      => ROOT_PATH . '/storages/logs',
    'templatedir' => ROOT_PATH . '/templates',
	'defaultContentType'     => 'text/html',
<<<<<<< HEAD
=======
    
>>>>>>> c2b93bfe3bc79d87fe043bba5487b45f82bb3c66
    // Locale
    'timezone'    => 'UTC',
    'locale'      => 'en_US',
    'lang'        => 'en',
    'charset'     => 'UTF-8',
    'defaultContentType' => 'text/html',
<<<<<<< HEAD
    // Envrironment
    'hostaname'   => shell_exec('hostname'),
=======
    
    // Envrironment
    'hostaname'   => shell_exec('hostname'),

>>>>>>> c2b93bfe3bc79d87fe043bba5487b45f82bb3c66
];