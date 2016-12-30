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

            $array  =  array('base'=>$base, 'id_client'=>$id_client, 'id_house'=>$id_house,'price_room'=>$price_room,'others'=>json_encode($others));
            $quota->insertToQuotaroom($array);
        }
    }

    public function saveQuotaPrestation(){
        $quota = new QuotaPrestation();
        $service = $_GET['service'];
        $client = (Object)$_SESSION['client'];
        $id_cli = $client->id;
        $others = $_GET['others'];
        $array  =  array('service'=>$service, 'id_client'=>$id_cli,'others'=>$others);

        $quota->insertToQuotaprestation($array);
    }

//    public function saveRoom(){
//        $others = new Room();
//
//        $id = $_GET['id'];
//        $exchange = $_SESSION['exchange'];
//        $room = $others->selectOthers($id);
//        $rest = $room[0];
//        $response = json_decode($rest['others']);
//        $currency = $response->{'public-rate'}->value->currency;
//        $rate = $response->{'wau-rate'}->value;
//
//        if($currency == "EUR"){
//            $price = $rate * $exchange['euro'];
//        }else if($currency == "MGA"){
//            $price = $rate;
//        }else{
//            $price = $rate * $exchange['dollar'];
//        }
//
//        return $price;
//    }
//
//    public function priceBoard(){
//        $board = new Restaurant();
//
//        $id =$_GET['id'];
//        $exchange = $_SESSION['exchange'];
//        $rslt = $board->otherBoard($id);
//        $data = json_decode($rslt[0]['others']);
//        $rate = $data->{'wau-rate'}->value;
//        $current = $data->{'price-menu'}->value->currency;
//
//        if($current == "EUR"){
//            $price = $rate * $exchange['euro'];
//        }else if($current == "MGA"){
//            $price = $rate;
//        }else{
//            $price = $rate * $exchange['dollar'];
//        }
//        return $price;
//    }
//
//    public function itBoard(){
//        $board = new Restaurant();
//
//        $menu = $_GET['menu'];
//        $exchange = $_SESSION['exchange'];
//        $rslt = $board->typeBoard($menu);
//        $data = json_decode($rslt[0]['others']);
//
//        $rate = $data->{'wau-rate'}->value;
//        $current = $data->{'price-menu'}->value->currency;
//        if($current == "EUR"){
//            $price = $rate * $exchange['euro'];
//        }else if($current == "MGA"){
//            $price = $rate;
//        }else{
//            $price = $rate * $exchange['dollar'];
//        }
//        return $price;
//    }
}