<?php
namespace App\Model;

use App\DatabaseConnection\PDOConnection;
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 07/11/16
 * Time: 10:31
 */
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
//        $query->bindParam(':id',$id,\PDO::PARAM_STR);
//        $query->execute();
//        $res=array();
//        while($row=$query->fetch(\PDO::FETCH_ASSOC)){
//            $res[]=$row;
//        };

    }
    public function selectOthers($id){
        $sql="SELECT others FROM room WHERE item_id=$id";
        return $this->instance->select($sql);
//        $query->bindParam(':id',$id,\PDO::PARAM_STR);
//        $query->execute();
//        $res=$query->fetch(\PDO::FETCH_ASSOC);
    }
}