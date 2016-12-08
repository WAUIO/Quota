<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 01/12/16
 * Time: 08:13
 */

namespace App\Model;
use App\DatabaseConnection\PDOConnection;

class QuotaRoom
{
    var $instance;
    public function __construct()
    {
        $this->instance = new PDOConnection();
//        $db = Connexion::getInstance();
//        $this->con = $db->getPdo();
    }
    public function insertToQuota($array){
        try{
            $sql="INSERT INTO quotaroom(base,board,id_cli,id_house,price_room,others) VALUES (:base,:board,:id_cli,:id_house,:price_room,:others)";
            $this->instance->insert($sql, $array);
//
//            $query->bindParam(":base", $base, \PDO::PARAM_STR);
//            $query->bindParam(":board", $board, \PDO::PARAM_STR);
//            $query->bindParam(":id_cli", $id_cli, \PDO::PARAM_INT);
//            $query->bindParam(":id_house", $id_house, \PDO::PARAM_INT);
//            $query->bindParam(":price_room", $price_room, \PDO::PARAM_STR);
//            $query->bindParam(":others", $others, \PDO::PARAM_STR);
            //$final= $query->execute();
//            return (string)$query;
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();

        }
    }
}