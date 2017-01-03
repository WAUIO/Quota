<?php
/**
 * Created by PhpStorm.
 * User: rindra
 * Date: 27/12/2016
 * Time: 08:48
 */

namespace App\Model;


use App\Utils\Exchange;

class ExchangeModel
{
    public function getExchange(){
        $euro = new Exchange(0);
        $dollar = new Exchange(1);
        $exchange = ['euro'=>$euro->exchange[0], 'dollar'=>$dollar->exchange[0]];
        $_SESSION['exchange'] = $exchange;

        return $exchange;
    }
}