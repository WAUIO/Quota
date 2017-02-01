<?php namespace App\Utils;

class Prestation{

    var $item_id;
    var $price;
    var $others;
    var $table;


    public function getTable(){
        return $this->table;
    }

    public function setTable($table) {
        $this->table = $table;
    }

    public function getOthers(){
        return $this->others;
    }

    public function setOthers($others) {
        $this->others = $others;
    }

    public function getPrice(){
        return $this->price;
    }

    public function setPrice($price) {
        $this->price = $price;
    }

    public function getItemId(){
        return $this->item_id;
    }

    public function setItemId($item_id) {
        $this->item_id = $item_id;
    }
}