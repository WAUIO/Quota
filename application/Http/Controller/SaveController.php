<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 08/11/16
 * Time: 12:38
 */

namespace App\Http\Controller;

use App\Model\QuotaRoom;
use App\Model\QuotaPrestation;
use App\Model\Restaurant;
use App\Model\Room;
use App\Utils\Exchange;
use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;

class SaveController extends Controller
{

    public function saveRoom(){
        $others = new Room();
        $id = $_GET['id'];
        $euro = new Exchange(0);
        $dollar = new Exchange(1);
        $e = $euro->exchange[0];
        $d = $dollar->exchange[0];
        $room = $others->selectOthers($id);
        $rest = $room[0];
        $response=json_decode($rest['others']);
        $currency = $response->{'public-rate'}->value->currency;
        $rate = $response->{'wau-rate'}->value;
        if($currency == "EUR"){
            $price = $rate * $e;
        }else if($currency == "MGA"){
            $price = $rate;
        }else{
            $price = $rate * $d;
        }
        return $price;

    }
    public function priceBoard(){
        $id =$_GET['id'];
        $board = new Restaurant();
        $euro = new Exchange(0);
        $dollar = new Exchange(1);
        $e = $euro->exchange[0];
        $d = $dollar->exchange[0];
        $rslt = $board->otherBoard($id);
        $data = json_decode($rslt[0]['others']);
        $rate = $data->{'wau-rate'}->value;
        $current = $data->{'price-menu'}->value->currency;
        if($current == "EUR"){
            $price = $rate * $e;
        }else if($current == "MGA"){
            $price = $rate;
        }else{
            $price = $rate * $d;
        }
        return $price;
    }

    public function itBoard(){
        $menu = $_GET['menu'];
        $board = new Restaurant();
        $euro = new Exchange(0);
        $dollar = new Exchange(1);
        $e = $euro->exchange[0];
        $d = $dollar->exchange[0];
        $rslt = $board->typeBoard($menu);
        $data = json_decode($rslt[0]['others']);

        $rate = $data->{'wau-rate'}->value;
        $current = $data->{'price-menu'}->value->currency;
        if($current == "EUR"){
            $price = $rate * $e;
        }else if($current == "MGA"){
            $price = $rate;
        }else{
            $price = $rate * $d;
        }
        return $price;
    }

    public function saveQuotaRoom(){
        $quota = new QuotaRoom();
        $base = $_GET['base'];
        $id_cli = $_GET['id'];
        $id_house = $_GET['idHouse'];
        $rate = $_GET['price'];
        $price_room = (float) $rate;
        $others = $_GET['others'];
        $array  =  array('base'=>$base, 'id_cli'=>$id_cli, 'id_house'=>$id_house,'price_room'=>$price_room,'others'=>$others);

        $quota->insertToQuotaroom($array);
    }

    public function saveQuotaPrestation(){
        $quota = new QuotaPrestation();
        $service = $_GET['service'];
        $id_cli = $_GET['id'];
        $others = $_GET['others'];
        $array  =  array('service'=>$service, 'id_client'=>$id_cli,'others'=>$others);

        $quota->insertToQuotaprestation($array);
    }

}