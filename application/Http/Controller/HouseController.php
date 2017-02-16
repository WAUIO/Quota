<?php namespace App\Http\Controller;

use App\Model\HouseModel;
use App\Model\RestaurantModel;
use App\Model\RoomModel;
use App\Utils\Restaurant;
use App\Utils\Room;
use Wau\Http\Controller;

class HouseController extends Controller{

    //edit room quotation
    public function editRoom(){
        $houseModel = new HouseModel();
        $roomModel = new RoomModel();

        $client_id = $_SESSION['client']->id;
        $registration = $roomModel->selectRegistration($client_id);
        $list_house = $houseModel->getAllHouse();
        array_set($data, 'title', "Room (add quotation)");
        array_set($data, 'registration', $registration);
        array_set($data, 'listhouse', $list_house);
        return $this->app()->make('twig.view')->render('room.twig', $data);
    }

    //get restaurants and rooms for selected house
    public function getAllHouseData(){
        $list  = array();
        $house_id = $_GET['house_id'];
        array_push($list, $this->dataRoom($house_id), $this->dataRestaurant($house_id));

        return $list;
    }

    //get all room data for $house_id
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

    //get all restaurant data for $house_id
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