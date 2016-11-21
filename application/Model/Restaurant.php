<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 17/11/16
 * Time: 14:46
 */

namespace App\Model;


class Restaurant
{
    private $conn;

    public function __construct(){
        $db = Connexion::getInstance();
        $this->conn = $db->getPdo();
    }
    public function selectRestauration($id){
        $sql="SELECT Id,Menu,Meals FROM Restaurant WHERE IdHouse = :id";
//        IdHouse=:id AND
        $query=$this->conn->prepare($sql);
        $query->bindParam(':id',$id,\PDO::PARAM_STR);
        $query->execute();
        $res=array();
        while($row=$query->fetch(\PDO::FETCH_ASSOC)){
            $res[]=$row;
        };
        return $res;
    }
}