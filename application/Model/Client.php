<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 27/11/16
 * Time: 21:22
 */

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
           $sqlQuery = "INSERT INTO client (ref_client, name, number_adult, number_child, start_date) VALUES(:ref,:name,:number_adult,:number_child,:date)";

           $this->instance->insert($sqlQuery,$array);
    }
    public function getId(){
        $stmt="SELECT MAX(id) FROM client";
        $id = $this->instance->select($stmt);
        return $id;
    }
}