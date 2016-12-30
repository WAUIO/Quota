<?php namespace App\Http\Controller;

use App\Utils\Client;
use Wau\Http\Controller;
use App\Model\ClientModel;

class InfoController extends Controller
{
    public function info(){
        if($_SESSION['client'] == null){
            $clientModel = new ClientModel();
            $_SESSION['client'] = $clientModel->getLastClient();
        }

        array_set($data, 'title', 'New customer');
        return $this->app()->make('twig.view')->render('info.twig', $data);
    }

    public function clientInsert(){
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
}