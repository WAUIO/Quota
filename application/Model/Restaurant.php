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
        $sql="SELECT item_id,menu,meals FROM restaurant WHERE house_id = :id";
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
    public function otherBoard($id){
        $sql="SELECT others FROM restaurant WHERE item_id = :id";
        $query=$this->conn->prepare($sql);
        $query->bindParam(':id',$id,\PDO::PARAM_STR);
        $query->execute();
        $res=$query->fetch(\PDO::FETCH_ASSOC);

        return $res;
    }

    public function typeBoard($menu){
        $sql="SELECT others FROM restaurant WHERE menu = :menu";
        $query=$this->conn->prepare($sql);
        $query->bindParam(':menu',$menu,\PDO::PARAM_STR);
        $query->execute();
        $res=$query->fetch(\PDO::FETCH_ASSOC);

        return $res;
    }
}