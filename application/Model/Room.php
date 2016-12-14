<?php
namespace App\Model;

use App\DatabaseConnection\PDOConnection;
class Room
{


    public function __construct(){
        $this->instance = new PDOConnection();
//        $db = Connexion::getInstance();
//        $this->conn = $db->getPdo();
    }

    public function selectRoom($id){
        $sql="SELECT item_id,category,others FROM room WHERE house_id = $id";
        return $this->instance->select($sql);

    }
    public function selectOthers($id){
        $sql="SELECT others FROM room WHERE item_id=$id";
        return $this->instance->select($sql);
    }
}