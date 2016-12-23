<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 10/11/16
 * Time: 08:19
 */

namespace App\Http\Controller;


use App\Model\ClientModel;
use App\Model\House;
use App\Model\Restaurant;
use App\Utils\Exchange;
use App\Model\Room;
use Wau\Http\Controller;

class HouseController extends Controller

{

     public function select(){
         $house = new House();

         $result = $house->selectData();
         $euro = new Exchange(0);
         $dollar = new Exchange(1);

         $id = new ClientModel();
         $Id = $id->getId();
         $lastId = $Id[0];
        return $this->app()->make('twig.view')->render('form.twig',['refclient'=>$lastId,'listhouse'=>$result,'euro'=>$euro->exchange[0],'dollar'=>$dollar->exchange[0]]);
     }

    public function dataRoom()
    {
        $list = new Room();
        $id = $_GET['id'];
        $room = $list->selectRoom($id);
       return json_encode($room);

    }
    public function dataRestaurant(){
        $board = new Restaurant();
        $id = $_GET['id'];
        $rest = $board->selectRestauration($id);
        return json_encode($rest);
    }



}