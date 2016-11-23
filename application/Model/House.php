<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 10/11/16
 * Time: 08:24
 */

namespace App\Model;
use Illuminate\Database\Eloquent\Model;


class House
{

    private $con; //variable de connexion

    public function __construct()
    {
        $db = Connexion::getInstance();
        $this->con = $db->getPdo();
    }
    public function selectData(){
        $sql="SELECT item_id,house_title FROM house";
        $query=$this->con->prepare($sql);
        $query->execute();
        $final=array();
        while($result=$query->fetch(\PDO::FETCH_ASSOC)){
            $final[]=$result;
        };
 return $final;


    }

}