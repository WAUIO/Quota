<?php

namespace App\Utils;

class RoomBase
{
    var $euro;
    var $dollar;
    var $type;
    var $content;
    var $room;
    var $breakfast;
    var $dinner;
    var $lunch;
    var $tax;
    var $vignette;
    var $total;

    static $room_type = array();

    public function __construct($array)
    {
        $this->content = array();
        $type       = $array[0];
        $room       = $array[1];
        $breakfast  = $array[2];
        $dinner     = $array[3];
        $lunch      = $array[4];
        $vignette   = $array[5];
        $tax        = $array[6];

        $euro   = $array[7];
        $dollar = $array[8];

        $somme = 0;
        $array_type = array("integer", "double");

        $this->type   = trim($type);

        $this->room[0] = ucfirst($this->type);
        if(isset($room) && in_array(gettype($room), $array_type) ){
            $this->room[1] = round($room, 2);
            $somme += $this->room[1];
        }

        $this->breakfast[0] = "Breakfast";
        if(isset($breakfast) && in_array(gettype($breakfast), $array_type) ){
            $this->breakfast[1] = round($breakfast, 2);

            $somme += $this->breakfast[1];
        }

        $this->dinner[0] = "Dinner";
        if(isset($dinner) && in_array(gettype($dinner), $array_type) ){
            $this->dinner[1] = round($dinner, 2);

            $somme += $this->dinner[1];
        }

        $this->lunch[0] = "Lunch";
        if(isset($lunch) && in_array(gettype($lunch), $array_type) ){
            $this->lunch[1] = round($lunch, 2);

            $somme += $this->lunch[1];
        }

        $this->tax[0] = "Various taxes";
        if(isset($tax) && in_array(gettype($tax), $array_type) ){
            $this->tax[1] = round($tax, 2);

            $somme += $this->tax[1];
        }

        $this->vignette[0] = "Vignette";
        if(isset($vignette) && in_array(gettype($vignette), $array_type) ){
            $this->vignette[1] = round($vignette, 2);

            $somme += $this->vignette[1];
        }

        $this->total[0] = "Total / pax";
        $this->total[1] = round($somme, 2);

        $this->euro   = round($euro, 2);
        $this->dollar = round($dollar, 2);

        array_push($this->content, $this->room, $this->breakfast, $this->lunch, $this->dinner, $this->vignette, $this->tax);


        array_push(self::$room_type, $this->room[0]);
    }
}