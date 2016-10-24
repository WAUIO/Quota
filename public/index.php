<?php
$_TIME = microtime(true);

$app = require_once dirname(dirname(__FILE__)) . '/bootstrap/app.php';

$app->run();