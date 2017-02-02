<?php namespace App\Model;

use App\DatabaseConnection\PDOConnection;

class PrestationModel{

    var $instance;

    public function __construct(){
        $this->instance = new PDOConnection();
    }

    public function insertToQuotaprestation($array){
        try{

            $sqlQuery = "INSERT INTO quotaprestation (id_client, service, others, registration, date) VALUES(:id_client, :service, :others, :registration, :date)";

            $this->instance->insert($sqlQuery,$array);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }

    public function getServices($tab){
        $sql = "SELECT * FROM ".$tab." WHERE price NOT LIKE ''";

        return $this->instance->select($sql);
    }

    public function selectQuotaPrestation($id_client, $registration){
        $sql = "SELECT * FROM quotaprestation WHERE id_client = $id_client AND registration = $registration";

        return $this->instance->select($sql);
    }

    public function selectRegistration($client_id){
        $sql = "SELECT DISTINCT registration FROM quotaprestation WHERE id_client = $client_id ORDER BY registration ASC";
        return $this->instance->select($sql);
    }

    public function duplicateRegistration($registration, $new_registration, $current_date){
        try{
            $sqlQuery = "INSERT INTO quotaprestation (service, id_client, others, registration, date) SELECT service, id_client, others, $new_registration, '$current_date' FROM quotaprestation WHERE registration=$registration";
            $this->instance->duplicate($sqlQuery);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }

    public function updatePrestation($array){
        try{
            $sqlQuery = "UPDATE quotaprestation SET service = :service , others = :others WHERE id= :id";
            $this->instance->update($sqlQuery,$array);
        }catch(\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }

    public function deleteRegistration($registration){
        try{
            $sql = "DELETE FROM quotaprestation WHERE registration = $registration";
            $this->instance->delete($sql);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }

    public function deleteQuotaPrestation($id){
        try{
            $sql = "DELETE FROM quotaprestation WHERE id = $id";
            $this->instance->delete($sql);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }
}