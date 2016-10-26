<?php

return [
<<<<<<< HEAD

    'template' => ROOT_PATH . '/templates',
    'cache'    => ROOT_PATH . '/storages/cache/views',
=======
    
    'template' => ROOT_PATH . '/templates',

    //'cache'    => ROOT_PATH . '/storages/cache/views',
    'cache'    => false,

    'extensions' => [
        "App\\Components\\TwigExtension"
    ]
>>>>>>> 5ec53b15887eef6db8ffbaefd7b3f405e8c26a40

];