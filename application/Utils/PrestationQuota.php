<?php

namespace App\Utils;


class PrestationQuota{

    var $min;
    var $max;
    var $value;
    var $all_prestation;
    var $date_registration;

    public function __construct($array){
        $this->min = $array[0];
        $this->max = $array[1];
        $this->value = $array[2];//array
        $this->all_prestation = $array[3];
        $this->date_registration = $array[4];
    }
}