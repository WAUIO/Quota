<?php

define('ROOT_PATH', dirname(dirname(__FILE__)));
define('PUBLIC_PATH', dirname(dirname(__FILE__)) . "/public");

require_once dirname(dirname(__FILE__)) . '/vendor/autoload.php';

$app = new \Wau\Application();

/**
 * RESOURCES MIDDLEWARES
 * --------------------------------------------------------
 * All middlewares that handle whole app resources,
 * it's proceed before resolving a found route
 * Add this kind of middleware under [app.resource] key
 *
 * @example
 * $app->middleware('app.resource', 'Wau\Podio\PodioAuthMiddleware');
 *
 */
$app->configure('database');

if (is_file(ROOT_PATH . '/application/routes.php')) {
    include_once ROOT_PATH . '/application/routes.php';
}

return $app;