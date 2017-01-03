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
            $sqlQuery = "INSERT INTO quotaroom (base, id_client, id_house, price_room, others) VALUES(:base,:id_client,:id_house,:price_room,:others)";

            $this->instance->insert($sqlQuery,$array);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }
}