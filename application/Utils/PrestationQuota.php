<?php
/**
 * Created by PhpStorm.
 * User: rindra
 * Date: 31/10/2016
 * Time: 10:31
 */

namespace App\Utils;


class PrestationQuota
{
    var $min;
    var $max;
    var $value;
    var $margin;
    var $vat;

    public function __construct($array)
    {
        $this->min = $array[0];
        $this->max = $array[1];
        $this->value = $array[2];
        $this->margin = $array[3];
        $this->vat = $array[4];
    }
}