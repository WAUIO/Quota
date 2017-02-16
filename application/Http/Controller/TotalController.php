<?php namespace App\Http\Controller;

use App\Model\ExchangeModel;

class TotalController extends RoomController{

    //show total (room & services) quotation
    public function quotaTotal(){
        $data = array();

        $client_id = $_SESSION['client']->id;
        $exchangeModel = new ExchangeModel();
        $exchange = $exchangeModel->getExchange();

        //$exchange (sale)
        $dataPrestation = $this->getPrestation($client_id);
        $dataRoom = $this->getRoom($client_id);
        $registration_room = array_keys($dataRoom);
        $registration_prestation = array_keys($dataPrestation);
        $allRegistration = array_merge( array_intersect($registration_room, $registration_prestation), array_diff($registration_room, $registration_prestation), array_diff($registration_prestation, $registration_room) );
        sort($allRegistration);

        array_set($data, 'title', "Total quotation");
        array_set($data, 'allRegistration', $allRegistration);
        array_set($data, 'dataPrestation', $dataPrestation);
        array_set($data, 'dataRoom', $dataRoom);
        array_set($data, 'exchange', $exchange['sale']);

        return $this->app()->make('twig.view')->render('quotaTotal.twig',$data);
    }
}