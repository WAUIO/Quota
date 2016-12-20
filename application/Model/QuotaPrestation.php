<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 13/12/16
 * Time: 15:49
 */

namespace App\Model;

use App\DatabaseConnection\PDOConnection;

class QuotaPrestation
{
    var $instance;
    public function __construct()
    {
        $this->instance = new PDOConnection();
    }
    public function insertToQuotaprestation($array){
        try{

            $sqlQuery = "INSERT INTO quotaprestation (service, id_client, others) VALUES(:service,:id_client,:others)";

            $this->instance->insert($sqlQuery,$array);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }

    public function selectQuotaprestation($id){
        $sql = "SELECT * FROM quotaprestation WHERE id_client =".$id;

        return $this->instance->select($sql);

    }
}