<?php namespace App\Http\Controller;


use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;


class QuotaViewController extends Controller
{

    //function index interface (list all workspace available for the users
    public function index(Request $request)
    {
        $data = array();
        $base_rooms = array();
        $room_data = array([3000, "single room", 1000, 20, 100, 50, 150, 200],[3000, "double room", 2000, 30, 100, 50, 150, 200],[15000, "family room", 2000, 50, 200, 10, 1500, 3000]);
        $single_room  = new RoomBase($room_data[0]);
        $double_room  = new RoomBase($room_data[1]);
        $family_room  = new RoomBase($room_data[2]);

        array_push($base_rooms, $single_room, $double_room, $family_room);

        array_set($data, 'base_rooms', $base_rooms);
        array_set($data, 'request', $request);

        array_set($data, 'tz', array_get($_SESSION, 'tz', 'UTC'));
        //var_dump($data);

        return $this->app()->make('twig.view')->render('index.twig',$data);
    }

}
class RoomBase
{
    var $exchange;
    var $type;
    var $content;
    var $room;
    var $breakfast;
    var $dinner;
    var $lunch;
    var $tax;
    var $vignette;
    var $total;

    public function __construct($array)
    {
        $this->content = array();
        $exchange   = $array[0];
        $type       = $array[1];
        $room       = $array[2];
        $breakfast  = $array[3];
        $dinner     = $array[4];
        $lunch      = $array[5];
        $vignette   = $array[6];
        $tax        = $array[7];

        $somme = 0;
        $array_type = array("integer", "string");

        $this->exchange     = $exchange;
        $this->type         = $type;

        $this->room[0] = ucfirst($type);
        if(isset($room) && in_array(gettype($room), $array_type) ){
            $this->room[1]      = round($room, 2);
            $this->room[2]      = round($room / $exchange, 2);
            $somme += $this->room[1];
        }

        $this->breakfast[0] = ucfirst("breakfast");
        if(isset($breakfast) && in_array(gettype($breakfast), $array_type) ){
            $this->breakfast[1] = round($breakfast, 2);
            $this->breakfast[2] = round($breakfast / $exchange, 2);

            $somme += $this->breakfast[1];
        }

        $this->dinner[0] = ucfirst("dinner");
        if(isset($dinner) && in_array(gettype($dinner), $array_type) ){
            $this->dinner[1]    = round($dinner, 2);
            $this->dinner[2]    = round($dinner / $exchange, 2);

            $somme += $this->dinner[1];
        }

        $this->lunch[0] = ucfirst("lunch");
        if(isset($lunch) && in_array(gettype($lunch), $array_type) ){
            $this->lunch[1]     = round($lunch, 2);
            $this->lunch[2]     = round($lunch / $exchange, 2);

            $somme += $this->lunch[1];
        }

        $this->vignette[0] = ucfirst("vignette");
        if(isset($vignette) && in_array(gettype($vignette), $array_type) ){
            $this->vignette[1]  = round($vignette, 2);
            $this->vignette[2]  = round($vignette / $exchange, 2);

            $somme += $this->vignette[1];
        }

        $this->tax[0] = ucfirst("various taxes");
        if(isset($tax) && in_array(gettype($tax), $array_type) ){
            $this->tax[1]       = round($tax, 2);
            $this->tax[2]       = round($tax / $exchange, 2);

            $somme += $this->tax[1];
        }

        array_push($this->content, $this->room, $this->breakfast, $this->lunch, $this->dinner, $this->tax, $this->vignette);

        $this->total[0] = ucfirst("total / pax");
        $this->total[1]     = round($somme, 2);
        $this->total[2]     = round($this->total[1] / $exchange, 2);

    }
}