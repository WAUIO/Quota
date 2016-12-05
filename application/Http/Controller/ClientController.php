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
        $ref=$_GET['ref_cli'];
        $name=$_GET['name'];
        $nb_adult=$_GET['adult'];
        $nb_child=$_GET['child'];
        $parts = explode('/', $_GET['date']);
        $date="$parts[2]-$parts[0]-$parts[1]";
        $client->insertClient($ref,$name,$nb_adult,$nb_child,$date);

        $_SESSION['id'] = $_GET['ref_cli'];

        return  $_SESSION['id'];
    }
}