<?php namespace App\Http\Controller;

use App\Model\ExchangeModel;
use App\Model\HouseModel;
use App\Model\QuotaRoomModel;
use App\Utils\RoomQuota;
use App\DatabaseConnection\PDOConnection;

class RoomController extends PrestationController
{
    var $instance;

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


    //show total (room & prestation) quotation
    public function quotaTotal()
    {
        $data = array();

        $client_id = $_SESSION['client']->id;
        $exchangeModel = new ExchangeModel();
        $exchange = $exchangeModel->getExchange();

        //$exchange (sale)
        $prestation = $this->getPrestation($client_id);
        $room = $this->getRoom($client_id)['room'];

        array_set($data, 'reference_quota', 'n° 123');
        array_set($data, 'title', "Total quotation");
        array_set($data, 'prestation', $prestation);
        array_set($data, 'base_rooms', $room);
        array_set($data, 'exchange', $exchange['sale']);

        return $this->app()->make('twig.view')->render('quotaTotal.twig',$data);
    }

    //save room quotation
    public function saveQuotaRoom(){
        $quotaModel = new QuotaRoomModel();
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
            $quotaModel->insertToQuotaroom($array);
        }
    }

    public function getRoom($client_id){
        $houseModel = new HouseModel();
        $base_rooms     = array();
        $details     = array();
        $exist_rooms[]  = false;

        $price[]    = 0;
        $tax[]      = 0;
        $vignette[] = 0;
        $exchange[] = 0;
        $boards[][] = 0;

        $query = "SELECT * FROM quotaroom WHERE id_client = ".$client_id;
        $instance = new PDOConnection();
        $result = $instance->select($query);

        foreach ($result as $res){
            $base = strtolower($res['base']);
            $res['base'] = $base;
            $res['others'] = json_decode($res['others']);
            $res['house_title'] = $house->getHouse($res['id_house'])[0]['house_title'];
            $details[] = $res;

            $price[$base] += $res['price_room'];

            if(array_key_exists('board', $res['others'])){
                foreach ($res['others']->board as $key => $value){
                    $boards[$base][$key] += $value;
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