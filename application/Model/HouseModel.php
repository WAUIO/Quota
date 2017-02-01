<?php namespace App\Model;

use App\DatabaseConnection\PDOConnection;


class HouseModel{

    var $instance;

    public function __construct(){
        $this->instance = new PDOConnection();
    }

    public function getAllHouse(){
        $sql = "SELECT item_id,house_title FROM house";
        return $this->instance->select($sql);
    }

    public function getHouse($id_house){
        $sql = "SELECT house_title FROM house WHERE item_id = ".$id_house;
        return $this->instance->select($sql);
    }

}