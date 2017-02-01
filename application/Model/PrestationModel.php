<?php namespace App\Model;

use App\DatabaseConnection\PDOConnection;

class PrestationModel{

    var $instance;

    public function __construct(){
        $this->instance = new PDOConnection();
    }

    public function insertToQuotaprestation($array){
        try{

            $sqlQuery = "INSERT INTO quotaprestation (id_client, service, others) VALUES(:id_client, :service, :others)";

            $this->instance->insert($sqlQuery,$array);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }

    public function updateToQuotaprestation($array){
        try{
            $sqlQuery = "UPDATE quotaprestation SET service = :service , others = :others WHERE id= :id";
            $this->instance->update($sqlQuery,$array);
        }catch(\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }

    public function getPrestation($client_id){
        $sql = "SELECT * FROM quotaprestation WHERE id_client = $client_id";

        return $this->instance->select($sql);
    }

    public function getServices($tab){
        $sql = "SELECT * FROM ".$tab." WHERE price NOT LIKE ''";

        return $this->instance->select($sql);
    }

    public function selectQuotaprestation($id){
        $sql = "SELECT * FROM quotaprestation WHERE id_client = $id";

        return $this->instance->select($sql);
    }

    public function deleteQuotaPrestation($id){
        try{
            $sql = "DELETE FROM quotaprestation WHERE id=$id";
            $this->instance->delete($sql);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }
}