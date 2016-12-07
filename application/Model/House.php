<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 10/11/16
 * Time: 08:24
 */

namespace App\Model;
use App\DatabaseConnection\PDOConnection;
use Illuminate\Database\Eloquent\Model;


class House
{
    var $instance;
    public function __construct()
    {
        $this->instance = new PDOConnection();
    }
    public function selectData(){
        $sql = "SELECT item_id,house_title FROM house";
        return $this->instance->select($sql);
    }

}