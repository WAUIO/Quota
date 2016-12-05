<?php
<<<<<<< HEAD
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 11/11/16
 * Time: 15:23
 */
return [

        'driver'   => 'mysql',
        'host'     => env('DB_HOST', 'localhost'),
        'database' => env('DB_NAME', 'WM-Database'),
        'username' => env('DB_USER', 'root'),
        'password' => env('DB_PASSWORD', 'ninahhexadec'),
        'prefix'   => '',
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',
=======

return [
    'driver'   => 'mysql',
    'host'     => env('DB_HOST', 'localhost'),
    'name_base' => env('DB_NAME', 'wm-database'),
    'username' => env('DB_USER', 'root'),
    'password' => env('DB_PASSWORD', ''),
    'prefix'   => '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
>>>>>>> c2b93bfe3bc79d87fe043bba5487b45f82bb3c66
];