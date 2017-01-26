<?php
/**
 * Created by PhpStorm.
 * User: rindra
 * Date: 22/12/2016
 * Time: 15:41
 */

namespace App\Utils;


class User{

    var $user_id;
    var $name;
    var $avatar;

    public function __construct($user){
        $this->user_id = $user->user_id;
        $this->name = $user->name;
        $this->image = $user->image;
    }
}