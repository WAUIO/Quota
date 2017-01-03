<?php namespace App\Http\Controller;

use App\Model\ExchangeModel;
use App\Model\QuotaRoom;
use App\Model\QuotaPrestation;
use App\Model\Restaurant;
use App\Model\Room;
use App\Utils\Exchange;
use Wau\Http\Controller;

class SaveController extends Controller
{
//<<<<<<< HEAD
//
//    public function getPriceRoom(){
//        $others = new Room();
//        $id = $_GET['id'];
//        $euro = new Exchange(0);
//        $dollar = new Exchange(1);
//        $e = $euro->exchange[0];
//        $d = $dollar->exchange[0];
//        $room = $others->selectOthers($id);
//        $rest = $room[0];
//        $response = json_decode($rest['others']);
//        $currency = $response->{'public-rate'}->value->currency;
//        $currency_vignet = $response->{'vignet-3'}->value->currency;
//        $currency_tax = $response->tax->currency;
//        $tax = $response->tax->value;
//        $vignet = $response->{'vignet-3'}->value->value;
//        $rate = $response->{'wau-rate'}->value;
//        $array= array();
//
//        if($currency == "EUR"){
//            $price = $rate * $e;
//        }else if($currency == "MGA"){
//            $price = $rate;
//        }else{
//            $price = $rate * $d;
//        }
//
//        if(array_key_exists('tax',$response)){
//            if($currency_tax == "EUR"){
//                $tax_value = $tax * $e;
//            }else if($currency_tax == "MGA"){
//                $tax_value = $tax;
//            }else{
//                $tax_value = $tax * $d;
//            }
//        }else{
//            $tax_value = 0;
//        }
//
//        if(array_key_exists('vignet-3',$response)){
//            if($currency_vignet == "EUR"){
//                $vignet_value = $vignet * $e;
//            }else if($currency_vignet == "MGA"){
//                $vignet_value = $vignet;
//            }else{
//                $vignet_value = $vignet * $d;
//            }
//
//        }else{
//            $vignet_value = 0;
//        }
//
//        array_push($array, $price, $vignet_value,$tax_value);
//        return $array;
//
//    }
//
//    public function getPriceBoard(){
//        $id =$_GET['id'];
//        $board = new Restaurant();
//        $euro = new Exchange(0);
//        $dollar = new Exchange(1);
//        $e = $euro->exchange[0];
//        $d = $dollar->exchange[0];
//        $rslt = $board->otherBoard($id);
//        $data = json_decode($rslt[0]['others']);
//        $rate = $data->{'wau-rate'}->value;
//        $current = $data->{'price-menu'}->value->currency;
//        if($current == "EUR"){
//            $price = $rate * $e;
//        }else if($current == "MGA"){
//            $price = $rate;
//        }else{
//            $price = $rate * $d;
//        }
//        return $price;
//    }
//
//    public function getPriceOtherBoard(){
//        $menu = $_GET['menu'];
//        $board = new Restaurant();
//        $euro = new Exchange(0);
//        $dollar = new Exchange(1);
//        $e = $euro->exchange[0];
//        $d = $dollar->exchange[0];
//        $rslt = $board->typeBoard($menu);
//        $data = json_decode($rslt[0]['others']);
//
//        $rate = $data->{'wau-rate'}->value;
//        $current = $data->{'price-menu'}->value->currency;
//        if($current == "EUR"){
//            $price = $rate * $e;
//        }else if($current == "MGA"){
//            $price = $rate;
//        }else{
//            $price = $rate * $d;
//        }
//        return $price;
//    }
//
//    public function saveQuotaRoom(){
//        $quota = new QuotaRoom();
//        $base = $_GET['base'];
//        $client = (Object)$_SESSION['client'];
//        $id_cli = $client->id;
//        $id_house = $_GET['idHouse'];
//        $rate = $_GET['price'];
//        $price_room = (float) $rate;
//        $others = $_GET['others'];
//        $array  =  array('base'=>$base, 'id_cli'=>$id_cli, 'id_house'=>$id_house,'price_room'=>$price_room,'others'=>$others);
//=======
    public function saveQuotaRoom(){
        $quota = new QuotaRoom();
        $all_data = $_GET['all_data'];
        $id_client = $_SESSION['client']->id;
        $exchange = $_SESSION['exchange'];
        foreach ($all_data as $data){
            $others = array();
            $base       = $data['base'];
            $id_house   = $data['id_house'];
            if(strtolower($data['currency']) == 'eur'){
                $price_room = (float)$data['rate'] * $exchange['euro'];
            }elseif(strtolower($data['currency']) == 'usd'){
                $price_room = (float)$data['rate'] * $exchange['dollar'];
            }else{
                $price_room = (float)$data['rate'];
            }

            $others['vignet'] = $data['vignet'];
            $others['room_title'] = $data['room_title'];
            $others['euro'] = $exchange['euro'];
            $others['dollar'] = $exchange['dollar'];
            if($data['board'] != null){
                $others['board'] = $data['board'];
            }
//>>>>>>> 45c40e96755f46038552ce24383c851476146aef

            $array  =  array('base'=>$base, 'id_client'=>$id_client, 'id_house'=>$id_house,'price_room'=>$price_room,'others'=>json_encode($others));
            $quota->insertToQuotaroom($array);
        }
    }

    public function saveQuotaPrestation(){
        $quota = new QuotaPrestation();
        $service = $_GET['service'];
        $others = $_GET['others'];
        $client = (Object)$_SESSION['client'];
        $id_cli = $client->id;

        $array = array('service'=>$service, 'id_client'=>$id_cli,'others'=>json_encode($others));
        $quota->insertToQuotaprestation($array);
    }
}