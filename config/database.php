<?php
return [
    'driver'   => 'mysql',
    'host'     => env('DB_HOST', 'localhost'),
    'database' => env('DB_NAME', 'WM-Database'),
    'username' => env('DB_USER', 'root'),
    'password' => env('DB_PASSWORD', 'ninahhexadec'),
    'prefix'   => '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
];