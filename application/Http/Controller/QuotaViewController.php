<?php namespace App\Http\Controller;


use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;
use App\Utils\RoomBase;

class QuotaViewController extends Controller
{

    //function index interface (list all workspace available for the users
    public function index(Request $request)
    {
        $data = array();
        $base_rooms = array();
        $details = array();


        $euro = 3000;
        $dollar = 2500;
        $single_room  = new RoomBase(array("single room", 1000, 20, 100, 50, 150, 200, $euro, $dollar));
        $double_room  = new RoomBase(array("double room", 2000, 30, 100, 50, 150, 200, $euro, $dollar));
        $family_room  = new RoomBase(array("family room", 15000, 50, 200, 10, 1500, 3000, $euro, $dollar));

        $existing_base = RoomBase::$room_type;

        array_push($base_rooms, $single_room, $double_room, $family_room);

        array_set($data, 'details', $details);
        array_set($data, 'existing_base', $existing_base);
        array_set($data, 'base_rooms', $base_rooms);
        array_set($data, 'request', $request);
        //var_dump($this->convert_currency(1000, "MGA","EURO"));

        $currency_input = 1000;
//currency codes : http://en.wikipedia.org/wiki/ISO_4217
        $currency_from = "MGA";
        $currency_to = "USD";
        $currency = $this->currencyConverter($currency_from,$currency_to,$currency_input);

        //var_dump( $currency_input.' '.$currency_from.' = '.$currency.' '.$currency_to);
        //var_dump($this->get_exchange_rate("MGA","EURO"));

        return $this->app()->make('twig.view')->render('room_quota.twig',$data);
    }
    function currencyConverter($currency_from,$currency_to,$currency_input){
        $yql_base_url = "http://query.yahooapis.com/v1/public/yql";
        $yql_query = 'select * from yahoo.finance.xchange where pair in ("'.$currency_from.$currency_to.'")';
        $yql_query_url = $yql_base_url . "?q=" . urlencode($yql_query);
        $yql_query_url .= "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        $yql_session = curl_init($yql_query_url);
        curl_setopt($yql_session, CURLOPT_RETURNTRANSFER,true);
        $yqlexec = curl_exec($yql_session);
        $yql_json =  json_decode($yqlexec,true);
        $currency_output = (float) $currency_input*$yql_json['query']['results']['rate']['Rate'];

        return $currency_output;
    }


}