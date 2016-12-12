<?php namespace App\Http\Controller;


use App\Utils\Exchange;
use FastRoute\RouteParser\Std;
use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;
//use App\Utils\RoomBase;

class infoController extends Controller
{
    public function info(Request $request)
    {
        $exchange = (object)array('euro'=>new Exchange(0), 'dollar'=>new Exchange(1));
        $_SESSION['exchange'] = $exchange;
        return $this->app()->make('twig.view')->render('info.twig');
    }

    public function afficheInfo(Request $request)
    {
        $data = array();
        $customerRef = $_POST['customerRef'];
        $name = $_POST['name'];
        $nbAdults = $_POST['nbAdults'];
        $nbChildren = $_POST['nbChildren'];
        $stay = $_POST['stay'];
        var_dump($customerRef, $name, $nbAdults, $nbChildren, $stay);

        array_set($data, 'session', $request->getSession());
        array_set($data, 'customerRef', $customerRef);
        array_set($data, 'name',$name);
        array_set($data, 'nb', $nbAdults);
        array_set($data, 'stay', $stay);

        return $this->app()->make('twig.view')->render('info.twig',$data);
    }

    public function saveClient(Request $request){
        $data = array();

        array_set($data, 'reference', $_GET['reference']);
        array_set($data, 'name',$_GET['name']);
        array_set($data, 'nbAdult', $_GET['nbAdults']);
        array_set($data, 'nbChildren', $_GET['nbChildren']);
        array_set($data, 'stay', $_GET['stay']);

//        return $this->app()->make('twig.view')->render('info.twig',$data);
        return $data;
    }

}