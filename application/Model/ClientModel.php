<?php namespace App\Model;

use App\DatabaseConnection\PDOConnection;
use App\Utils\Client;

class ClientModel{

    var $instance;

    public function __construct(){
        $this->instance = new PDOConnection();
    }

    public function selectClientByid($client_id){
        $query = "SELECT * FROM client WHERE id = ".$client_id;
        return $this->instance->select($query);
    }

    public function selectAllClient(){
        $query = "SELECT * FROM client";
        return $this->instance->select($query);
    }

    public function insertClient($array){
        $sqlQuery = "INSERT INTO client (ref_client, name, number_adult, number_child, start_date) VALUES(:reference,:name,:number_adult,:number_child,:date)";
        $this->instance->insert($sqlQuery,$array);
    }

    public function existClient($reference){
        $query = "SELECT * FROM client WHERE ref_client = '$reference'";
        $res = $this->instance->select($query);
        if (count($res)>0)
            return true;
        else
            return false;
    }

    public function getLastClient(){
        $query = "SELECT * FROM client ORDER BY id DESC LIMIT 1";
        $result = $this->instance->select($query);
        if(count($result) > 0){
            $res = $result[0];
            $client = new Client();
            $client->setId($res['id']);
            $client->setName($res['name']);
            $client->setReference($res['ref_client']);
            $client->setNumberAdult($res['number_adult']);
            $client->setNumberChild($res['number_child']);
            $client->setStartDate($res['start_date']);
            return $client;
        }else
            return null;
    }
}