<?php
/**
 * Created by PhpStorm.
 * User: rindra
 * Date: 29/12/2016
 * Time: 09:24
 */

namespace App\Utils;


class Restaurant{

    var $id;
    var $house_id;
    var $menu;
    var $meals;
    var $others;

    public function getId(){
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getHouseId(){
        return $this->house_id;
    }

    public function setHouseId($house_id) {
        $this->house_id = $house_id;
    }

    public function getMenu(){
        return $this->menu;
    }

    public function setMenu($menu) {
        $this->menu = $menu;
    }

    public function getMeals(){
        return $this->meals;
    }

    public function setMeals($meals) {
        $this->meals = $meals;
    }

    public function getOthers(){
        return $this->others;
    }

    public function setOthers($others) {
        $this->others = $others;
    }
}