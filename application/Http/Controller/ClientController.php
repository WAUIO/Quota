<?php namespace App\Http\Controller;

use App\DatabaseConnection\PDOConnection;
use App\Utils\Client;
use App\Utils\Exchange;
use Wau\Http\Controller;
use App\Model\ClientModel;

class ClientController extends Controller
{
    //edit client
    public function informationClient(){
        if($_SESSION['client'] == null){
            $clientModel = new ClientModel();
            $client = $clientModel->getLastClient();
            if($client != null){
                $_SESSION['client'] = $client;
            }
        }

        array_set($data, 'title', 'Customer');
        return $this->app()->make('twig.view')->render('aboutClient.twig', $data);
    }

    public function addClient(){
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

        $parts = explode('/', $_GET['date']);
        $date = "$parts[2]-$parts[1]-$parts[0]";


        $client->setReference($_GET['reference']);
        $client->setName($_GET['name']);
        $client->setNumberAdult($_GET['nbAdults']);
        $client->setNumberChild($_GET['nbChildren']);
        $client->setStartDate($date);

        $array = array('reference'=>$client->getReference(),'name'=>$client->getName(),'number_adult'=>$client->getNumberAdult(),'number_child'=>$client->getNumberChild(),'date'=>$client->getStartDate());

        if ($clientModel->existClient($client->getReference())){
            return "client exist";
        }
        else {
            $clientModel->insertClient($array);
            $client->setId($clientModel->getLastClient()->getId());
            $_SESSION['client'] = $client;
            return $client->getReference();
        }
    }

    public function setClient(){
        $client = new Client();
        $clientModel = new ClientModel();
        $client_id = $_GET['client_id'];
        $result = $clientModel->selectClientByid($client_id);

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

        $clientModel = new ClientModel();
        $result = $clientModel->selectAllClient();

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