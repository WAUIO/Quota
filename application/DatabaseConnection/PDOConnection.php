<?php

namespace App\DatabaseConnection;

use Wau\Application;

class PDOConnection
{
    private static $instance = null;
    var $host;
    var $name_base;
    var $user;
    var $password;

    public function getInstance()
    {
        if(is_null(self::$instance))
        {
            $app        = Application::getInstance();
            $this->host       = $app->config('database.host');
            $this->name_base  = $app->config('database.name_base');
            $this->user       = $app->config('database.username');
            $this->password   = $app->config('database.password');

            return new \PDO('mysql:dbname='.$this->name_base.';host='.$this->host, $this->user , $this->password);
        }
        return self::$instance;
    }

    public function delete($query)
    {
        $this->getInstance()->exec($query);
    }

    public function executeQuery($query, $array)
    {
        $stmt = $this->getInstance()->prepare($query, array(\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY));

        //replace special characters in key
        foreach ($array as $key => $value){
            if(!preg_match("#^[a-zA-Z0-9]+$#", $key)){
                $new_key = preg_replace('/[^A-Za-z0-9]/', "", $key);
                $array[$new_key] = $value;
                unset($array[$key]);
            }
        }

        $stmt->execute($array);
        $stmt->closeCursor();
    }



    public function is_exist($table, $data){
        $result = $this->getInstance()->query("SELECT * FROM ".$table." WHERE item_id = '".$data[0]."'");
        if ($result->rowCount()>0)
            return true;
        else
            return false;
    }


}