<?php namespace App\Http\Controller;

use App\Model\ClientModel;

class HomeController extends RoomController{

    public function home(){
        if($_SESSION['client'] == null){
            $clientModel = new ClientModel();
            $client = $clientModel->getLastClient();
            if($client != null){
                $_SESSION['client'] = $client;
            }
        }
        $client_id = $_SESSION['client']->id;
        $room = $this->getRoom($client_id);
        $prestation = $this->getPrestation($client_id);
        array_set($data, 'title', 'Customer information');
        array_set($data, 'room', $room['detail']);
        array_set($data, 'prestation', $prestation);

        return $this->app()->make('twig.view')->render('home.twig', $data);
    }
}