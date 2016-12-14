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
    }
    public function insertToQuotaroom($array){
        try{
//            $sql="INSERT INTO quotaroom(base,board,id_cli,id_house,price_room,others) VALUES (:base,:board,:id_cli,:id_house,:price_room,:others)";
//            $this->instance->insert($sql, $array);

            $sqlQuery = "INSERT INTO quotaroom (base, id_cli, id_house, price_room, others) VALUES(:base,:id_cli,:id_house,:price_room,:others)";

            $this->instance->insert($sqlQuery,$array);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }
}