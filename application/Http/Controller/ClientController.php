<?php

namespace App\Http\Controller;
use App\DatabaseConnection\PDOConnection;
use App\Model\ClientModel;
use App\Utils\Client;
use App\Utils\Exchange;
use Symfony\Component\HttpFoundation\Request;
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

        $array = array('reference'=>"azerty",'name'=>$client->getName(),'number_adult'=>$client->getNumberAdult(),'number_child'=>$client->getNumberChild(),'date'=>$client->getStartDate());
        $clientModel->insertClient($array);

        $_SESSION['client'] = $client;

        return($client);
    }

    public function setClient(Request $request){
        $client = new Client();

        $client_id = $_GET['client_id'];

        $query = "SELECT * FROM client WHERE id = ".$client_id;
        $instance = new PDOConnection();
        $result = $instance->select($query);

        foreach ($result as $res){
            $client->setId($res['id']);
            $client->setName($res['name']);
            $client->setReference($res['ref_client']);
            $client->setNumberAdult($res['number_adult']);
            $client->setNumberChild($res['number_child']);
            $client->setStartDate($res['start_date']);
        }

        $_SESSION['client'] = $client;
        return $_SESSION['client']->getName();
    }

    public function getClient(){
        $array = array();

        $exchange = (object)array('euro'=>new Exchange(0), 'dollar'=>new Exchange(1));
        $_SESSION['exchange'] = $exchange;

        $client_session = new Client();
        $query = "SELECT * FROM client";
        $instance = new PDOConnection();
        $result = $instance->select($query);

        foreach ($result as $res){
            $client = new Client();
            $client->setId($res['id']);
            $client->setReference($res['ref_client']);
            $client->setName($res['name']);
            $client->setNumberChild($res['number_child']);
            $client->setNumberAdult($res['number_adult']);
            $client->setStartDate($res['start_date']);

            $client_session = $client;
            $array[] = $client;
        }

        if($_SESSION['client'] == null){
            $_SESSION['client'] = $client_session;
        }

        return $array;
    }
}