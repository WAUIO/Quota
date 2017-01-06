<?php namespace App\Http\Controller;

use App\Model\QuotaRoomModel;
use App\Model\QuotaPrestationModel;
use Wau\Http\Controller;

class SaveController extends Controller
{
    public function saveQuotaRoom(){
        $quota = new QuotaRoomModel();
        $all_data = $_GET['all_data'];
        $id_client = $_SESSION['client']->id;
        $exchange = $_SESSION['exchange'];
        foreach ($all_data as $data){
            $others = array();
            $base       = $data['base'];
            $id_house   = $data['id_house'];
            if(strtolower($data['currency']) == 'eur'){
                $price_room = (float)$data['rate'] * $exchange['euro'];
            }elseif(strtolower($data['currency']) == 'usd'){
                $price_room = (float)$data['rate'] * $exchange['dollar'];
            }else{
                $price_room = (float)$data['rate'];
            }

            $others['vignet'] = $data['vignet'];
            $others['room_title'] = $data['room_title'];
            $others['euro'] = $exchange['euro'];
            $others['dollar'] = $exchange['dollar'];
            if($data['board'] != null){
                $others['board'] = $data['board'];
            }

            $array  =  array('base'=>$base, 'id_client'=>$id_client, 'id_house'=>$id_house,'price_room'=>$price_room,'others'=>json_encode($others));
            $quota->insertToQuotaroom($array);

        }
        return $all_data;
    }

    public function saveQuotaPrestation(){
        $quotaModel = new QuotaPrestationModel();
        $all_data = $_GET['all_data'];
        $id_client = $_SESSION['client']->id;

        foreach ($all_data as $data){
            $service = $data['service'];
            $others = $data['others'];

            $array = array('id_client'=>$id_client, 'service'=>$service, 'others'=>json_encode($others));
            $quotaModel->insertToQuotaprestation($array);
        }
        return $all_data;
    }
}