<?php


namespace App\Model;

use App\DatabaseConnection\PDOConnection;
use App\Utils\Client;

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

    public function getLastClient(){
        $stmt="SELECT * FROM client ORDER BY id DESC LIMIT 1";
        $res = $this->instance->select($stmt)[0];
        $client = new Client();
        $client->setId($res['id']);
        $client->setName($res['name']);
        $client->setReference($res['ref_client']);
        $client->setNumberAdult($res['number_adult']);
        $client->setNumberChild($res['number_child']);
        $client->setStartDate($res['start_date']);

        return $client;
    }

}