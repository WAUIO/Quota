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
    var $type;


    public function getType()
    {
        return $this->type;
    }

    public function setType($type)
    {
        $this->type = $type;
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