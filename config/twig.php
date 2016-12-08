<?php

return [
    'template' => ROOT_PATH . '/templates',

    //'cache'    => ROOT_PATH . '/storages/cache/views',
    'cache'    => false,

    'extensions' => [
        "App\\Components\\TwigExtension"
    ]

];