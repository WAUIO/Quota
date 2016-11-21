<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 10/11/16
 * Time: 08:19
 */

namespace App\Http\Controller;


use App\Model\House;
use App\Model\Restaurant;
use Wau\Http\Controller;
use App\Model\Room;

class HouseController extends Controller

{

     public function select(){

//
         $house = new House();
         $result=$house->selectData();
//        $sgl=$this->singleRoom($data);

         return $this->app()->make('twig.view')->render('form.twig',['listhouse'=>$result]);
    }

    public function dataRoom()
    {
        $list=new Room();
        $id=$_GET['id'];
    //  $data=json_encode($id);
       //var_dump($id);exit;
        $room=$list->selectRoom($id);
        return json_encode($room);
    }
    public function dataRestaurant(){
        $board=new Restaurant();
        $id=$_GET['id'];
        $rest=$board->selectRestauration($id);
        return json_encode($rest);
    }
}