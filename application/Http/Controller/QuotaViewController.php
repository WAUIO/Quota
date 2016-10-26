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


        $single_room  = new RoomBase(array(3000, "single room", 1000, 20, 100, 50, 150, 200));
        $double_room  = new RoomBase(array(3000, "double room", 2000, 30, 100, 50, 150, 200));
        $family_room  = new RoomBase(array(3000, "family room", 15000, 50, 200, 10, 1500, 3000));

        $existing_base = RoomBase::$room_type;

        array_push($base_rooms, $single_room, $double_room, $family_room);

        array_set($data, 'details', $details);
        array_set($data, 'existing_base', $existing_base);
        array_set($data, 'base_rooms', $base_rooms);
        array_set($data, 'request', $request);


        return $this->app()->make('twig.view')->render('index.twig',$data);
    }

}