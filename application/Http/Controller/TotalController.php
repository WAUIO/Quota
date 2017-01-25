<?php

namespace App\Http\Controller;


use App\Model\ExchangeModel;

class TotalController extends RoomController
{
    //show total (room & prestation) quotation
    public function quotaTotal()
    {
        $data = array();

        $client_id = $_SESSION['client']->id;
        $exchangeModel = new ExchangeModel();
        $exchange = $exchangeModel->getExchange();

        //$exchange (sale)
        $prestation = $this->getPrestation($client_id);
        $room = $this->getRoom($client_id)['room'];

        array_set($data, 'reference_quota', 'n° 123');
        array_set($data, 'title', "Total quotation");
        array_set($data, 'prestation', $prestation);
        array_set($data, 'base_rooms', $room);
        array_set($data, 'exchange', $exchange['sale']);

        return $this->app()->make('twig.view')->render('quotaTotal.twig',$data);
    }
}