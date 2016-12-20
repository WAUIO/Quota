<?php


namespace App\Model;

use App\DatabaseConnection\PDOConnection;

class ClientModel
{
    var $instance;

    public function __construct()
    {
        $this->instance = new PDOConnection();
    }
    public function insertClient($array){
           $sqlQuery = "INSERT INTO client (ref_client, name, number_adult, number_child, start_date) VALUES(:reference,:name,:number_adult,:number_child,:date)";

           $this->instance->insert($sqlQuery,$array);

    }
    public function getId(){
        $stmt="SELECT MAX(id) as id FROM client";
        foreach($this->instance->select($stmt) as $res){
            $id_client = $res['id'];
        }
        return $id_client;
    }
}