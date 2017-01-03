<?php namespace App\Utils;


class RoomQuota
{
    var $exchange;
    var $type;
    var $content;
    var $room;
    var $board;
    var $tax;
    var $vignette;
    var $total;
    var $margin;
    var $vat;

    public function __construct($array)
    {
        $somme = 0;
        $array_type = array("integer", "double");
        $this->content = array();
        $type       = $array[0];
        $room       = $array[1];
        $boards     = $array[2];//array()
        $vignette   = $array[3];
        $tax        = $array[4];
        $this->exchange   = $array[5];

        $this->type   = trim($type);

        $this->room['label'] = ucfirst($this->type);
        if(isset($room) && in_array(gettype($room), $array_type) ){
            $this->room['value'] = round($room, 2);
            $somme += $this->room['value'];
        }
        array_push($this->content, $this->room);

        $this->board['label'] = "Board";
        if($boards->length >0){
            foreach ($boards as $key=>$value){
                $this->board['value'] += $value;
                $somme += $value;
            }
        }
        else{
            $this->board['value'] = 0;
        }
        array_push($this->content, $this->board);
        //array_push($this->content, array('label'=>ucfirst($key),'value'=>$value));

        $this->tax['label'] = "Various taxes";
        if(isset($tax) && in_array(gettype($tax), $array_type) ){
            $this->tax['value'] = round($tax, 2);
            $somme += $this->tax['value'];
        }

        $this->vignette['label'] = "Vignette";
        if(isset($vignette) && in_array(gettype($vignette), $array_type) ){
            $this->vignette['value'] = round($vignette, 2);
            $somme += $this->vignette['value'];
        }

        $this->total['label'] = "Total / pax";
        $this->total['value'] = round($somme, 2);

        array_push($this->content, $this->vignette, $this->tax, $this->total);
    }
}