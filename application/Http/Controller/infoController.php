<?php namespace App\Http\Controller;


use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;
use App\Model\Client;
//use App\Utils\RoomBase;

class infoController extends Controller
{
    public function info()
    {
        return $this->app()->make('twig.view')->render('info.twig');

    }

    public function clientInsert(){
        session_start();
        $client=new Client();
        $ref = $_GET['customerRef'];
        $name  = $_GET['name'];
        $nb_adult = $_GET['nbAdults'];
        $nb_child = $_GET['nbChildren'];
        $parts = explode('/', $_GET['stay']);//
        $date="$parts[2]-$parts[1]-$parts[0]";
        $array = array('ref'=>$ref,'name'=>$name,'number_adult'=>$nb_adult,'number_child'=>$nb_child,'date'=>$date);
        $client->insertClient($array);

        $_SESSION['id'] = $_GET['ref_cli'];

        //return  $_SESSION['id'];
        return($array);
    }

}