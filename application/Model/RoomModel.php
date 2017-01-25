<?php
namespace App\Model;

use App\DatabaseConnection\PDOConnection;

class RoomModel
{
    var $instance;
    public function __construct(){
        $this->instance = new PDOConnection();
    }

    public function selectRoom($id){
        $sql = "SELECT * FROM room WHERE house_id = $id";
        return $this->instance->select($sql);
    }

    public function selectOthers($id){
        $sql = "SELECT others FROM room WHERE item_id=$id";
        return $this->instance->select($sql);
    }

    public function selectQuotaRoom($client_id){
        $sql = "SELECT * FROM quotaroom WHERE id_client = $client_id";
        return $this->instance->select($sql);
    }

    public function insertToQuotaRoom($array){
        try{
            $sqlQuery = "INSERT INTO quotaroom (base, id_client, id_house, price_room, others) VALUES(:base,:id_client,:id_house,:price_room,:others)";

            $this->instance->insert($sqlQuery,$array);
        }catch (\Exception $e){
            echo $e->getCode(),$e->getMessage(),$e->getLine();
        }
    }
}