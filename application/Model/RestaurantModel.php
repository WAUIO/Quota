<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 17/11/16
 * Time: 14:46
 */

namespace App\Model;
use App\DatabaseConnection\PDOConnection;

class RestaurantModel
{
    var $instance;

    public function __construct(){
        $this->instance = new PDOConnection();
    }
//    :application/Model/RestaurantModel.php

    public function selectRestaurant($id){
        $sql="SELECT * FROM restaurant WHERE house_id = $id";
        return $this->instance->select($sql);
    }

    public function otherBoard($id){
        $sql="SELECT others FROM restaurant WHERE item_id = $id";
        return $this->instance->select($sql);
    }

    public function typeBoard($menu){
        $sql="SELECT others FROM restaurant WHERE menu = '".$menu."'";
        return $this->instance->select($sql);
    }
}