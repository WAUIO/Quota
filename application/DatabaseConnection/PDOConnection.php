<?php

namespace App\DatabaseConnection;
header( 'content-type: text/html; charset=utf-8' );
use Wau\Application;

class PDOConnection
{
    private static $instance = null;
    var $host;
    var $database;
    var $user;
    var $password;

    public function getInstance()
    {
        if(is_null(self::$instance))
        {
            $app        = Application::getInstance();
            $this->host       = $app->config('database.host');
            $this->name_base  = $app->config('database.database');
            $this->user       = $app->config('database.username');
            $this->password   = $app->config('database.password');

            return self::$instance = new \PDO('mysql:dbname='.$this->name_base.';host='.$this->host, $this->user, $this->password, array(\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
        }
        return self::$instance;

    }

    /**
     * @return null
     */

    public function insert($query, $array)
    {
        $stmt = $this->getInstance()->prepare($query, array(\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY));
        $stmt->execute($array);
        $stmt->closeCursor();
    }

    public function insert_migration($query, $array)
    {
        $stmt = $this->getInstance()->prepare($query, array(\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY));
        $stmt->execute($array);
        $stmt->closeCursor();
    }

    public function  select($query)
    {
        $stm = $this->getInstance()->prepare($query);
        $stm->execute();
        return $stm->fetchAll();
    }

    public function is_exist($table, $data){
        $result = $this->getInstance()->query("SELECT * FROM ".$table." WHERE item_id = '".$data[0]."'");
        if ($result->rowCount()>0)
            return true;
        else
            return false;
    }
}