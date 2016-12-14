<?php
/**
 * Created by PhpStorm.
 * User: rindra
 * Date: 28/11/2016
 * Time: 16:18
 */

namespace App\Utils;


class Prestation
{
    var $item_id;
    var $title;
    var $price;
    var $others;


    public function getOthers()
    {
        return $this->others;
    }

    public function setOthers($others)
    {
        $this->others = $others;
    }
    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getItemId()
    {
        return $this->item_id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setItemId($item_id)
    {
        $this->item_id = $item_id;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }
}