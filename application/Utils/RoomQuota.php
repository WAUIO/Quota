<?php namespace App\Utils;


class RoomQuota
{
    var $exchange;
    var $type;
    var $content;
    var $room;
    var $breakfast;
    var $tax;
    var $vignette;
    var $total;
    var $margin;
    var $vat;

    public function __construct($array)
    {
        $this->content = array();
        $type       = $array[0];
        $room       = $array[1];
        $breakfast  = $array[2];
        $vignette   = $array[3];
        $tax        = $array[4];
        $this->exchange   = $array[5];

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

        array_push($this->content, $this->room, $this->breakfast, $this->vignette, $this->tax, $this->total);
    }
}