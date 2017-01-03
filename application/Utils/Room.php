<?php
/**
 * Created by PhpStorm.
 * User: rindra
 * Date: 28/12/2016
 * Time: 10:58
 */

namespace App\Utils;


class Room
{
    var $id;
    var $house_id;
    var $category;
    var $others;

    public function getId()
    {
        return $this->id;
    }
    public function setId($id)
    {
        $this->id = $id;
    }
    public function getHouseId()
    {
        return $this->house_id;
    }
    public function setHouseId($house_id)
    {
        $this->house_id = $house_id;
    }
    public function getCategory()
    {
        return $this->category;
    }
    public function setCategory($category)
    {
        $this->category = $category;
    }
    public function getOthers()
    {
        return $this->others;
    }
    public function setOthers($others)
    {
        $this->others = $others;
    }
}