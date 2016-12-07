<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 30/11/16
 * Time: 12:59
 */

namespace App\Http\Controller;
use App\Model\Client;
use Wau\Http\Controller;

class ClientController extends Controller
{
    public function clientInsert(){
        session_start();
        $client=new Client();
        $ref = $_GET['ref_cli'];
        $name  = $_GET['name'];
        $nb_adult = $_GET['adult'];
        $nb_child = $_GET['child'];
        $parts = explode('/','01/05/2016');//$_GET['date']
        $date="$parts[2]-$parts[0]-$parts[1]";
        $array = array('ref'=>$ref,'name'=>$name,'number_adult'=>$nb_adult,'number_child'=>$nb_child,'date'=>$date);
        $client->insertClient($array);

        $_SESSION['id'] = $_GET['ref_cli'];

        return  $_SESSION['id'];
    }
}