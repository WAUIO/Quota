<?php namespace App\Http\Controller;

use App\Model\House;
use App\Utils\RoomQuota;
use App\DatabaseConnection\PDOConnection;

class QuotaViewController extends PrestationController
{
    var $instance;

    public function room_quota()
    {
        $data = array();
        $array = $this->getRoom();

        array_set($data, 'title', 'Room quotation');
        array_set($data, 'details', $array['detail']);
        array_set($data, 'base_rooms', $array['room']);

        return $this->app()->make('twig.view')->render('room_quota.twig',$data);
    }

    public function total_quota()
    {
        $data = array();

        $exchange = $_SESSION['exchange'];
        $exchange = array('euro'=>$exchange['euro'], 'dollar'=>$exchange['dollar']);
        $prestation = $this->getPrestation();
        $room = $this->getRoom()['room'];

        array_set($data, 'reference_quota', 'n° 123');
        array_set($data, 'title', "Total quotation");
        array_set($data, 'prestation', $prestation);
        array_set($data, 'base_rooms', $room);
        array_set($data, 'exchange', $exchange);

        return $this->app()->make('twig.view')->render('total_quota.twig',$data);
    }

    public function getRoom(){
        $house = new House();
        $base_rooms     = array();
        $details     = array();
        $exist_rooms[]  = false;

        $price[]    = 0;
        $tax[]      = 0;
        $vignette[] = 0;
        $exchange[] = 0;
        $boards[][] = 0;

        $client_id = $_SESSION['client']->id;
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
            }else $boards[$base] = null;

            $tax[$base]         += $res['others']->tax;
            $vignette[$base]    += $res['others']->vignet;
            $exchange[$base]    = ['euro'=>$res['others']->euro, 'dollar'=>$res['others']->dollar];
            $exist_rooms[$base] = true;
        }

        foreach ($exist_rooms as $key=>$value ){
            if($value == true){
                $room  = new RoomQuota(array($key." room", $price[$key], $boards[$key], $vignette[$key], $tax[$key], $exchange[$key]));
                array_push($base_rooms, $room);
            }
        }
        return array('room'=>$base_rooms,'detail'=>$details);
    }
}