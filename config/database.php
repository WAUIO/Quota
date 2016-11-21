<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 11/11/16
 * Time: 15:23
 */
return [

        'driver'   => 'mysql',
        'host'     => env('DB_HOST', 'localhost'),
        'database' => env('DB_NAME', 'quotadb'),
        'username' => env('DB_USER', 'root'),
        'password' => env('DB_PASSWORD', 'ninahhexadec'),
        'prefix'   => '',
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',

];