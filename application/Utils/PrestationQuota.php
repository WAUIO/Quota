<?php

namespace App\Utils;


class PrestationQuota{

    var $min;
    var $max;
    var $value;
    var $margin;
    var $vat;
    var $all_prestation;

    public function __construct($array){
        $this->min = $array[0];
        $this->max = $array[1];
        $this->value = $array[2];//array
        $this->margin = $array[3];
        $this->vat = $array[4];
        $this->all_prestation = $array[5];
    }
}