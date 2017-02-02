<?php
namespace App\Model;

use App\DatabaseConnection\PDOConnection;

class RoomModel{

    var $instance;

    public function __construct(){
        $this->instance = new PDOConnection();
    }

    public function selectRoom($id){
        $sql = "SELECT * FROM room WHERE house_id = $id";
        return $this->instance->select($sql);
    }

    public function selectOthers($id){
        $sql = "SELECT others FROM room WHERE item_id = $id";
        return $this->instance->select($sql);
    }

    public function selectQuotaRoom($client_id, $registration){
        $sql = "SELECT * FROM quotaroom WHERE id_client = $client_id AND registration = $registration";
        return $this->instance->select($sql);
    }

    public function selectRegistration($client_id){
        $sql = "SELECT DISTINCT registration FROM quotaroom WHERE id_client = $client_id ORDER BY registration ASC";
        return $this->instance->select($sql);
    }

    public function insertToQuotaRoom($array){
        try{
            $sqlQuery = "INSERT INTO quotaroom (base, id_client, id_house, price_room, others, registration, date) VALUES(:base,:id_client,:id_house,:price_room,:others,:registration,:date)";
            $this->instance->insert($sqlQuery,$array);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }

    public function duplicateRegistration($registration, $new_registration, $current_date){
        try{
            $sqlQuery = "INSERT INTO quotaroom (base, id_client, id_house, price_room, others, registration, date) SELECT base, id_client, id_house, price_room, others, $new_registration, '$current_date' FROM quotaroom WHERE registration = $registration";
            $this->instance->duplicate($sqlQuery);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }

    public function deleteRegistration($registration){
        try{
            $sql = "DELETE FROM quotaroom WHERE registration = $registration";
            $this->instance->delete($sql);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }

    public function deleteQuotaRoom($id){
        try{
            $sql = "DELETE FROM quotaroom WHERE id = $id";
            $this->instance->delete($sql);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }
}