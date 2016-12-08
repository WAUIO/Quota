<?php

namespace App\Model;

use App\DatabaseConnection\PDOConnection;

class Client
{
    var $instance;

    public function __construct()
    {
        $this->instance = new PDOConnection();
    }
    public function insertClient($array){
       try{
           $sqlQuery = "INSERT INTO client (ref_client, name, number_adult, number_child, start_date) VALUES(:ref,:name,:number_adult,:number_child,:date)";

           $this->instance->insert($sqlQuery,$array);
           return true;
       }catch (\Exception $e){
           echo $e->getMessage(),$e->getCode();
       }
    }
    public function getId(){
        $stmt="SELECT MAX(id) FROM client";
        $id = $this->instance->select($stmt);
        return $id;
    }
}