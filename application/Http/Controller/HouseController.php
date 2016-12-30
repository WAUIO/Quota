<?php namespace App\Http\Controller;

use App\Model\ClientModel;
use App\Model\House;
use App\Model\RestaurantModel;
use App\Model\RoomModel;
use App\Utils\Restaurant;
use App\Utils\Room;
use Wau\Http\Controller;

class HouseController extends Controller
{
    public function select(){
        $house = new House();
        $list_house = $house->getAllHouse();
        array_set($data, 'title', "Room (add quotation)");
        array_set($data, 'listhouse', $list_house);

        return $this->app()->make('twig.view')->render('form1.twig', $data);
    }

    public function getAllHouseData(){
        $list  = array();
        $house_id = $_GET['house_id'];
        array_push($list, $this->dataRoom($house_id), $this->dataRestaurant($house_id));

        return $list;
    }

    public function dataRoom($house_id){
        $list  = array();
        $roomModel = new RoomModel();
        $result = $roomModel->selectRoom($house_id);

        foreach($result as $res){
            $room = new Room();
            $room->setId( $res['item_id'] );
            $room->setCategory( $res['category'] );
            $room->setHouseId( $res['house_id'] );
            $room->setOthers( $res['others'] );
            array_push($list, $room);
        }

        return $list;
    }

    public function dataRestaurant($house_id){
        $list  = array();
        $restaurantModel = new RestaurantModel();
        $result = $restaurantModel->selectRestaurant($house_id);

        foreach($result as $res){
            $restaurant = new Restaurant();
            $restaurant->setId( $res['item_id'] );
            $restaurant->setHouseId( $res['house_id'] );
            $restaurant->setMenu( $res['menu'] );
            $restaurant->setMeals( $res['meals'] );
            $restaurant->setOthers( $res['others'] );
            array_push($list, $restaurant);
        }

        return $list;
    }
}