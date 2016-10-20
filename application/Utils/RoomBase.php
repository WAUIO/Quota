<?php

class RoomBase
{
    var $type;
    var $room;
    var $breakfast;
    var $dinner;
    var $lunch;
    var $tax;
    var $vignette;
    var $total;

    public function __construct($type,$room,$breakfast,$dinner,$lunch,$vignette,$tax)
    {
        $this->type = $type;
        $this->room = $room;
        $this->breakfast = $breakfast;
        $this->dinner = $dinner;
        $this->lunch = $lunch;
        $this->vignette = $vignette;
        $this->tax = $tax;
        $this->total = $room+$breakfast+$dinner+$lunch+$vignette+$tax;
    }

    /*Setters */

    /*public function setType($type)
    {
        $this->type = $type;
    }

    public function setRoom($room)
    {
        $this->room = $room;
    }

    public function setBreakfast($breakfast)
    {
        $this->breakfast = $breakfast;
    }

    public function setDinner($dinner)
    {
        $this->dinner = $dinner;
    }

    public function setLunch($lunch)
    {
        $this->lunch = $lunch;
    }

    public function setTax($tax)
    {
        $this->tax = $tax;
    }

    public function setVignette($vignette)
    {
        $this->vignette = $vignette;
    }

    public function setTotal($total)
    {
        $this->total = $total;
    }

    /*Getters */
    /*public function getType()
    {
        return $this->type;
    }

    public function getRoom()
    {
        return $this->room;
    }

    public function getBreakfast()
    {
        return $this->breakfast;
    }

    public function getDinner()
    {
        return $this->dinner;
    }

    public function getLunch()
    {
        return $this->lunch;
    }

    public function getTax()
    {
        return $this->tax;
    }

    public function getVignette()
    {
        return $this->vignette;
    }
    public function getTotal()
    {
        return $this->total;
    }*/

}