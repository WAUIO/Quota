<?php namespace App\Utils;

class Client{

    var $id;
    var $reference;
    var $name;
    var $number_child;
    var $number_adult;
    var $start_date;

    public function getId(){
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function getReference(){
        return $this->reference;
    }

    public function setReference($reference) {
        $this->reference = $reference;
        return $this;
    }

    public function getName(){
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    public function getNumberChild(){
        return $this->number_child;
    }

    public function setNumberChild($number_child) {
        $this->number_child = $number_child;
        return $this;
    }

    public function getNumberAdult(){
        return $this->number_adult;
    }

    public function setNumberAdult($number_adult) {
        $this->number_adult = $number_adult;
        return $this;
    }

    public function getStartDate(){
        return $this->start_date;
    }

    public function setStartDate($start_date) {
        $this->start_date = $start_date;
        return $this;
    }
}