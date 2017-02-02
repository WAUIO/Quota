<?php namespace App\Http\Controller;

use App\Model\HouseModel;
use App\Model\RoomModel;
use App\Utils\RoomQuota;
use Wau\Request;

class RoomController extends PrestationController{

    //show room quotation
    public function quotaRoom(){
        $data = array();
        $client_id = $_SESSION['client']->id;
        $dataRoom = $this->getRoom($client_id);

        array_set($data, 'title', 'Room quotation');
        array_set($data, 'dataRoom', $dataRoom);

        return $this->app()->make('twig.view')->render('quotaRoom.twig',$data);
    }

    //save room quotation
    public function saveQuotaRoom(Request $request){
        $quotaModel = new RoomModel();
        $name_house= "";
        $all_data = $request->get('all_data');
        $id_client = $_SESSION['client']->id;
        $exchange = $_SESSION['exchange'];
        $now = new \DateTime();

        foreach ($all_data as $data){
            $others = array();
            $base           = $data['base'];
            $id_house       = $data['id_house'];
            $name_house     = $data['name_house'];
            $registration   = $data['registration'];

            $currency = strtolower($data['currency']);
            if($currency == 'eur'){
                $currency_value = $exchange['euro'];
            }elseif($currency == 'usd'){
                $currency_value =  $exchange['dollar'];
            }else{
                $currency_value = 1;
            }

            $price_room = (float)$data['rate'] * $currency_value;

            $others['stay']         = $data['stay'];
            $others['vignet']       = $data['vignet'];
            $others['room_title']   = $data['room_title'];
            $others['euro']         = $exchange['euro'];
            $others['dollar']       = $exchange['dollar'];

            if(array_key_exists('board', $data)){
                foreach ($data['board'] as $key=>$value){
                    $data['board'][$key] = (float)$value * $currency_value;
                }
            }

            $others['board'] = $data['board'];

            $array  =  array('base'=>$base, 'id_client'=>$id_client, 'id_house'=>$id_house, 'price_room'=>$price_room, 'others'=>json_encode($others), 'registration'=>$registration,'date'=>$now->format('Y-m-d H:i:s'));
            $quotaModel->insertToQuotaRoom($array);
        }

        return $name_house;
    }

    //delete room quotation
    public function deleteQuotaRoom(){
        $id_room = $_GET['id_item'];
        $roomModel = new RoomModel();
        $roomModel->deleteQuotaRoom($id_room);
    }

    //delete room quotation
    public function deleteRegistrationRoom($registration){
        $roomModel = new RoomModel();
        $roomModel->deleteRegistration($registration);
    }

    //duplicate room quotation
    public function duplicateRegistrationRoom($registration, $new_registration, $current_date){
        $roomModel = new RoomModel();
        $roomModel->duplicateRegistration($registration, $new_registration, $current_date);
    }

    //select all room for client
    public function getRoom($client_id){
        $houseModel     = new HouseModel();
        $roomModel      = new RoomModel();
        $dataRoom       = array();

        $allRegistration = $roomModel->selectRegistration($client_id);
        foreach($allRegistration as $reg){
            $base_rooms = array();
            $details    = array();
            $exist_rooms= array();
            $price[]    = 0;
            $tax[]      = 0;
            $vignette[] = 0;
            $exchange[] = 0;
            $boards[][] = 0;
            $date_registration = null;

            $registration = $reg['registration'];
            $result = $roomModel->selectQuotaRoom($client_id, $registration);
            foreach ($result as $res){
                $date_registration = $res['date'];
                $base = strtolower($res['base']);
                $res['base'] = $base;
                $res['others'] = json_decode($res['others']);
                $res['house_title'] = $houseModel->getHouse($res['id_house'])[0]['house_title'];
                $details[] = $res;

                $stay = $res['others']->stay;
                $price[$base] += $res['price_room'] * $stay;

                if(array_key_exists('board', $res['others'])){
                    foreach ((array)$res['others']->board as $key => $value){
                        $boards[$base][$key] += $value * $stay;
                    }
                }

                $tax[$base]         += $res['others']->tax;
                $vignette[$base]    += $res['others']->vignet;
                $exchange[$base]    = ['euro'=>$res['others']->euro, 'dollar'=>$res['others']->dollar];
                $exist_rooms[$base] = true;
            }
            foreach ($exist_rooms as $key=>$value ){
                $room  = new RoomQuota(array($key." room", $price[$key], $boards[$key], $vignette[$key], $tax[$key], $exchange[$key]));
                array_push($base_rooms, $room);
            }

            $dataRoom[$registration] = array('room'=>$base_rooms,'detail'=>$details, 'date_registration'=>(new \DateTime($date_registration))->format("D, d M Y"));
            unset($price);
            unset($tax);
            unset($vignette);
            unset($exchange);
            unset($boards);
        }
        return $dataRoom;
    }
}