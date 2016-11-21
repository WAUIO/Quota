<?php
namespace App\Model;
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 07/11/16
 * Time: 10:31
 */
class Room
{
    private $conn;

    public function __construct(){
        $db = Connexion::getInstance();
        $this->conn = $db->getPdo();
    }

    public function selectRoom($id){
        $sql="SELECT Id,Name,Category FROM Room WHERE IdHouse = :id";
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
//  public function updateData(){}

}