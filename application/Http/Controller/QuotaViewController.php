<?php namespace App\Http\Controller;


use App\Model\House;
use App\Utils\Client;
use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;
use App\Utils\PrestationQuota;
use App\Utils\RoomQuota;
use App\Utils\Exchange;
use App\DatabaseConnection\PDOConnection;

class QuotaViewController extends Controller
{

    var $instance;

    public function room_quota()
    {
        $data = array();
        $details = array();

        $array = $this->getRoom();
        $base_rooms = $array['room'];
        $details = $array['detail'];

        array_set($data, 'details', $details);
        array_set($data, 'base_rooms', $base_rooms);

        return $this->app()->make('twig.view')->render('room_quota.twig',$data);
    }

    public function getRoom(){
        $base_rooms     = array();
        $details     = array();
        $exist_rooms[]  = false;

        $price[]    = 0;
        $tax[]      = 0;
        $vignette[] = 0;
        $exchange[] = 0;

        $client_id = $_SESSION['client']->id;
        $query = "SELECT * FROM quotaroom WHERE id_client = ".$client_id;
        $instance = new PDOConnection();
        $result = $instance->select($query);

        foreach ($result as $res){
            $base = strtolower($res['base']);
            $house = new House();
            $res['others'] = json_decode($res['others']);
            $res['house_title'] = $house->getHouse($res['id_house'])[0]['house_title'];
            $details[] = $res;

            $price[$base]       += $res['price_room'];
            $tax[$base]         += $res['others']->tax;
            $vignette[$base]    += $res['others']->vignet;
            $exchange[$base]    = ['euro'=>$res['others']->euro, 'dollar'=>$res['others']->dollar];
            $exist_rooms[$base] = true;
        }

        foreach ($exist_rooms as $key=>$value ){
            if($value == true){
                $room  = new RoomQuota(array($key." room", $price[$key], 20, $vignette[$key], $tax[$key], $exchange[$key]));
                array_push($base_rooms, $room);
            }
        }
        //var_dump($details);
        return array('room'=>$base_rooms,'detail'=>$details);
    }

    public function getPrestation(){
        $client_id = $_SESSION['client']->id;
        $query = "SELECT * FROM quotaprestation WHERE id_client = ".$client_id;
        $instance = new PDOConnection();
        $result = $instance->select($query);

        $prestation[] = 0;
        $smaller = 100;
        $bigger = 0;

        foreach ($result as $res){
            $others = json_decode($res['others']);
            $min = $others->pax_min;
            $max = $others->pax_max;
            $rate_service = $others->rate_service;

            $i = $min-1;
            if(strtolower($others->type_service) == "per person"){
                while($i < $max){
                    $prestation[$i] += $rate_service;
                    $i++;
                }
            }else{
                $number = $max - $min + 1;
                while($i < $max){
                    $prestation[$i] += $rate_service / $number;
                    $i++;
                }
            }

            //get the min and max pax
            if($smaller > $min){
                $smaller = $min;
            }
            if($bigger < $max){
                $bigger = $max;
            }
        }

        $margin = 20;
        $vat = 20;
        return new PrestationQuota(array($smaller, $bigger, $prestation, $margin, $vat));
    }

    public function total_quota()
    {
        $data = array();

        $exchange = $_SESSION['exchange'];
        $exchange = array('euro'=>$exchange['euro'], 'dollar'=>$exchange['dollar']);

        array_set($data, 'reference_quota', 'n° 123');
        array_set($data, 'prestation', $this->getPrestation());
        array_set($data, 'base_rooms', $this->getRoom()['room']);
        array_set($data, 'exchange', $exchange);

        return $this->app()->make('twig.view')->render('total_quota.twig',$data);
    }
}