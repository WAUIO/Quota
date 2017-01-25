<?php namespace App\Http\Controller;

use App\Model\ExchangeModel;
use App\Model\HouseModel;
use App\Model\RoomModel;
use App\Utils\RoomQuota;

class RoomController extends PrestationController
{
    //show room quotation
    public function quotaRoom()
    {
        $data = array();
        $client_id = $_SESSION['client']->id;
        $array = $this->getRoom($client_id);

        array_set($data, 'title', 'Room quotation');
        array_set($data, 'details', $array['detail']);
        array_set($data, 'base_rooms', $array['room']);

        return $this->app()->make('twig.view')->render('quotaRoom.twig',$data);
    }

    //save room quotation
    public function saveQuotaRoom(){
        $quotaModel = new RoomModel();
        $name_house= "";
        $all_data = $_GET['all_data'];
        $id_client = $_SESSION['client']->id;
        $exchange = $_SESSION['exchange'];

        foreach ($all_data as $data){
            $others = array();
            $base       = $data['base'];
            $id_house   = $data['id_house'];
            $name_house = $data['name_house'];

            $currency = strtolower($data['currency']);
            if($currency == 'eur'){
                $currency_value = $exchange['euro'];
            }elseif($currency == 'usd'){
                $currency_value =  $exchange['dollar'];
            }else{
                $currency_value = 1;
            }

            $price_room = (float)$data['rate'] * $currency_value;

            $others['stay']       = $data['stay'];
            $others['vignet']       = $data['vignet'];
            $others['room_title']   = $data['room_title'];
            $others['euro']         = $exchange['euro'];
            $others['dollar']       = $exchange['dollar'];

            if(array_key_exists('board', $data)){
                foreach ($data['board'] as $key=>$value){
                    $data['board'][$key] = (float)$value * $currency_value;
                }
            }

            $others['board'] = $data['board'];

            $array  =  array('base'=>$base, 'id_client'=>$id_client, 'id_house'=>$id_house,'price_room'=>$price_room,'others'=>json_encode($others));
            $quotaModel->insertToQuotaRoom($array);
        }

        return $name_house;
    }

    //select client room
    public function getRoom($client_id){
        $houseModel = new HouseModel();
        $roomModel = new RoomModel();
        $base_rooms     = array();
        $details     = array();
        $exist_rooms[]  = false;

        $price[]    = 0;
        $tax[]      = 0;
        $vignette[] = 0;
        $exchange[] = 0;
        $boards[][] = 0;

        $result = $roomModel->selectQuotaRoom($client_id);

        foreach ($result as $res){
            $base = strtolower($res['base']);
            $res['base'] = $base;
            $res['others'] = json_decode($res['others']);
            $res['house_title'] = $houseModel->getHouse($res['id_house'])[0]['house_title'];
            $details[] = $res;

            $stay = $res['others']->stay;
            $price[$base] += $res['price_room'] * $stay;

            if(array_key_exists('board', $res['others'])){
                foreach ((array)$res['others']->board as $key => $value){
                    $boards[$base][$key] += $value * $stay;
                }
            }

            $tax[$base]         += $res['others']->tax;
            $vignette[$base]    += $res['others']->vignet;
            $exchange[$base]    = ['euro'=>$res['others']->euro, 'dollar'=>$res['others']->dollar];
            $exist_rooms[$base] = true;
        }
        foreach ($exist_rooms as $key=>$value ){
            if($value){
                $room  = new RoomQuota(array($key." room", $price[$key], $boards[$key], $vignette[$key], $tax[$key], $exchange[$key]));
                array_push($base_rooms, $room);
            }
        }

        return array('room'=>$base_rooms,'detail'=>$details);
    }
}