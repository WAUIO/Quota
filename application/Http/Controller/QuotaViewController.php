<?php namespace App\Http\Controller;


use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;
use App\Utils\RoomQuota;
use App\Utils\TotalQuota;

class QuotaViewController extends Controller
{

    function convert_currency($amount, $from_code, $to_code){
        ini_set('max_execution_time', 60);
        $temp = 'http://www.google.com/ig/calculator?hl=en&q=' . $amount . $from_code . '=?' . $to_code;

        $response = file_get_contents($temp);
        $result_string = explode('"', $response);

        $final_result = $result_string['3'];

        $float_result = preg_replace("/[^0-9\.]/", '', $final_result);

        return $float_result;
    }
    public function room_quota(Request $request)
    {
        var_dump($this->convert_currency( 1000, "EUR", "USD"));
        $ref = "quota n°xxxx";
        $data = array();
        $details = array();

        $base_rooms = $this->getRoom($ref);
        $existing_base = RoomQuota::$room_type;

        array_set($data, 'details', $details);
        array_set($data, 'existing_base', $existing_base);
        array_set($data, 'base_rooms', $base_rooms);
        array_set($data, 'request', $request);

        return $this->app()->make('twig.view')->render('room_quota.twig',$data);
    }

    public function getRoom($quota_ref){
        $base_rooms = array();

        $euro = 3000;
        $dollar = 2500;
        $single_room  = new RoomQuota(array("single room", 1000, 20, 100, 50, 150, 200, $euro, $dollar));
        $double_room  = new RoomQuota(array("double room", 2000, 30, 100, 50, 150, 200, $euro, $dollar));
        $family_room  = new RoomQuota(array("family room", 15000, 50, 200, 10, 1500, 3000, $euro, $dollar));

        array_push($base_rooms, $single_room, $double_room, $family_room);

        return $base_rooms;
    }


    public function total_quota(Request $request)
    {
        $ref = "quota n°xxxx";
        $data = array();
        $details = array();
        $base_rooms = $this->getRoom($ref);

        array_set($data, 'details', $details);
        array_set($data, 'base_rooms', $base_rooms);
        array_set($data, 'request', $request);

        return $this->app()->make('twig.view')->render('total_quota.twig',$data);
    }
}