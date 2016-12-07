<?php namespace App\Http\Controller;


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
    public function listClient(){
        $array = array();
        $this->instance = new PDOConnection();
        $query = "SELECT * FROM client";
        $result = $this->instance->select($query);

        foreach ($result as $res){
            $client = new Client();
            $client->setId($res['id']);
            $client->setRefClient($res['ref_client']);
            $client->setName($res['name']);
            $client->setNumberChild($res['number_child']);
            $client->setNumberAdult($res['number_adult']);
            $client->setStartDate($res['start_date']);

            $array[] = $client;
        }
        return $array;
    }
    public function room_quota(Request $request)
    {
        $request->getSession()->set('ref_client', "quota n°123");
        $data = array();
        $details = array();

        $base_rooms = $this->getRoom("n°123");
        $existing_base = RoomQuota::$room_type;

        array_set($data, 'details', $details);
        array_set($data, 'existing_base', $existing_base);
        array_set($data, 'base_rooms', $base_rooms);
        array_set($data, 'request', $request);

        return $this->app()->make('twig.view')->render('room_quota.twig',$data);
    }

    public function getRoom($reference_quota){
        //exchange[0] => achat
        //exchange[1] => vente
        //exchange[2] => mid

        $base_rooms = array();
        $euro = new Exchange(0);
        $dollar = new Exchange(1);

        $exchange = array('euro'=>$euro->exchange[0], 'dollar'=>$dollar->exchange[0]);

        $margin = 10;
        $vat = 20;
        $single_room  = new RoomQuota(array("single room", 1000, 20, 100, 50, 150, 200, $exchange, $margin, $vat));
        $double_room  = new RoomQuota(array("double room", 2000, 30, 100, 50, 150, 200, $exchange, $margin, $vat));
        $family_room  = new RoomQuota(array("family room", 15000, 50, 200, 10, 1500, 3000, $exchange, $margin, $vat));

        array_push($base_rooms, $single_room, $double_room, $family_room);

        return $base_rooms;
    }

    public function getPrestation($reference_quota){
        $min = 2;
        $max = 22;
        $margin = 20;
        $vat = 20;
        return new PrestationQuota(array($min, $max, array(11,22,33,44,55,66,77,88,99,10,11,22,33,44,55,66,77,88,99,10,11,12), $margin, $vat));
    }

    public function total_quota(Request $request)
    {
        $data = array();

        $euro = new Exchange(0);
        $dollar = new Exchange(1);

        //exchange[0] achat
        //exchange[1] vente
        //exchange[2] mid

        $exchange = array('euro'=>$euro->exchange[0], 'dollar'=>$dollar->exchange[0]);

        $base_rooms = $this->getRoom("n°123");
        $prestation = $this->getPrestation("");

        $existing_base = RoomQuota::$room_type;

        array_set($data, 'reference_quota', 'n° 123');
        array_set($data, 'prestation', $prestation);
        array_set($data, 'base_rooms', $base_rooms);
        array_set($data, 'existing_base', $existing_base);
        array_set($data, 'exchange', $exchange);
        array_set($data, 'request', $request);

        return $this->app()->make('twig.view')->render('total_quota.twig',$data);
    }
}