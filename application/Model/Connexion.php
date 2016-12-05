<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 10/11/16
 * Time: 08:48
 */

namespace App\Model;
use Wau\Application;
class Connexion
{
    static protected $instance;

    /**
     * @var \PDO
     */
    protected $pdo;
    protected function initialize(){

    }

    protected function __construct()
    {
        $app            = Application::getInstance();
        $host    =$app->config('database.host');//'localhost'; //
        $dbname = $app->config('database.database');//'WM-Database';//
        $user= $app->config('database.username');//        $user= $app->config('database.username');//
        $password =$app->config('database.password');//'ninahhexadec';
        try {
            $this->pdo = new \PDO("mysql:host=".$host.";dbname=".$dbname,$user,$password,
                array(\PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        } catch (\PDOException $e) {
            echo 'Error: ' . $e->getMessage().','.$e->getCode().','.$e->getFile().','.$e->getLine().','.$e->getTrace();
        }

    }


    public static function getInstance()
    {
        if (!self::$instance instanceof self)
        {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function __clone()
    {
        return false;
    }
    public function __wakeup()
    {
        return false;
    }

    /**
     * @return \PDO
     */
    public function getPdo()
    {
        return $this->pdo;
    }
}