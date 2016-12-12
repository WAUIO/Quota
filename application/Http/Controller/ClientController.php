<?php

namespace App\Http\Controller;
use App\Model\ClientModel;
use Wau\Http\Controller;

class ClientController extends Controller
{
    public function clientInsert(){
        $clientModel=new ClientModel();
        $client = new \App\Utils\Client();

        $parts = explode('/', $_GET['stay']);//
        $date="$parts[2]-$parts[1]-$parts[0]";

        $client->setReference( $_GET['customerRef']);
        $client->setName( $_GET['name']);
        $client->setNumberAdult( $_GET['nbAdults']);
        $client->setNumberChild( $_GET['nbChildren']);
        $client->setStartDate( $date);

        $array = array('ref'=>$client->getReference(),'name'=>$client->getName(),'number_adult'=>$client->getNumberAdult(),'number_child'=>$client->getNumberChild(),'date'=>$client->getStartDate());
        $clientModel->insertClient($array);

        $_SESSION['client'] = $client;

        return($array);
    }
}