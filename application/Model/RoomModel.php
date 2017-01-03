<?php
namespace App\Model;

use App\DatabaseConnection\PDOConnection;

class RoomModel
{
    var $instance;
    public function __construct(){
        $this->instance = new PDOConnection();
    }

    public function selectRoom($id){
        $sql = "SELECT * FROM room WHERE house_id = $id";
        return $this->instance->select($sql);
    }

    public function selectOthers($id){
        $sql = "SELECT others FROM room WHERE item_id=$id";
        return $this->instance->select($sql);
    }
}