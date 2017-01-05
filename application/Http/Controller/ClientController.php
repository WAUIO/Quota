<?php namespace App\Http\Controller;

use App\DatabaseConnection\PDOConnection;
use App\Utils\Client;
use App\Utils\Exchange;
use Wau\Http\Controller;
use App\Model\ClientModel;

class ClientController extends Controller
{
    //edit client
    public function clientForm(){
        if($_SESSION['client'] == null){
            $clientModel = new ClientModel();
            $_SESSION['client'] = $clientModel->getLastClient();
        }

        array_set($data, 'title', 'New customer');
        return $this->app()->make('twig.view')->render('client.twig', $data);
    }

    public function saveClient(){
        $clientModel = new ClientModel();
        $client = new Client();

        $parts = explode('/', $_GET['stay']);
        $date = "$parts[2]-$parts[1]-$parts[0]";

        $client->setReference($_GET['reference']);
        $client->setName($_GET['name']);
        $client->setNumberAdult($_GET['nbAdults']);
        $client->setNumberChild($_GET['nbChildren']);
        $client->setStartDate($date);

        $array = array('reference'=>$client->getReference(),'name'=>$client->getName(),'number_adult'=>$client->getNumberAdult(),'number_child'=>$client->getNumberChild(),'date'=>$client->getStartDate());
        $clientModel->insertClient($array);

        $client->setId($clientModel->getLastClient()->getId());
        $_SESSION['client'] = $client;

        return $array;
    }

    public function setClient(){
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

        $euro   = new Exchange(0);
        $dollar = new Exchange(1);

        $exchange = array('euro' => $euro->exchange[0], 'dollar' => $dollar->exchange[0]);
        $_SESSION['exchange'] = $exchange;

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

            $array[] = $client;
        }
        return $array;
    }
}