<?php
return [
    'driver'   => 'mysql',
    'host'     => env('DB_HOST', 'localhost'),
    'database' => env('DB_NAME', 'wm-database'),
    'username' => env('DB_USER', 'root'),
    'password' => env('DB_PASSWORD', 'ninahhexadec'),
    'prefix'   => '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
];