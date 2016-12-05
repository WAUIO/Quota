<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 27/11/16
 * Time: 21:22
 */

namespace App\Model;


class Client
{
    public function __construct()
    {
        $db = Connexion::getInstance();
        $this->con = $db->getPdo();
    }
    public function insertClient($ref_cli,$name,$nb_adult,$nb_child,$date){
        $sqlQuery = "INSERT INTO client(id,ref_client,name,number_adult,number_child,start_date) VALUES(NULL ,:ref,:name,:number_adult,:number_child,:start_date)";

        $statement = $this->con->prepare($sqlQuery);

        $lastId = $this->con->lastInsertId();
//
        $statement->bindParam(":ref", $ref_cli, \PDO::PARAM_STR);
        $statement->bindParam(":name", $name, \PDO::PARAM_STR);
        $statement->bindParam(":number_adult", $nb_adult, \PDO::PARAM_INT);
        $statement->bindParam(":number_child", $nb_child, \PDO::PARAM_INT);
        $statement->bindParam(":start_date", $date, \PDO::PARAM_STR);
        $statement->execute();
        return $lastId;

    }
    public function getId(){
        //$last =  $this->con->query('SELECT  FROM client;')

         $sql="SELECT MAX(id) FROM client";
        $query=$this->con->prepare($sql);
        $query->execute();
        $last=$query->fetch(\PDO::FETCH_ASSOC);
        return $last;
    }
}