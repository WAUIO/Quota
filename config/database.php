<?php

return [
    'driver'   => 'mysql',
    'host'     => env('DB_HOST', 'localhost'),
    'name_base' => env('DB_NAME', 'wm-database'),
    'username' => env('DB_USER', 'root'),
    'password' => env('DB_PASSWORD', ''),
    'prefix'   => '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
];