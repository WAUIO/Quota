<?php namespace App\Http\Controller;


use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;
//use App\Utils\RoomBase;

class infoController extends Controller
{
    public function info()
    {
        return $this->app()->make('twig.view')->render('info.twig');
    }

    public function afficheInfo()
    {
        $data = array();
        $customerRef = $_POST['customerRef'];
        $name = $_POST['name'];
        $nbAdults = $_POST['nbAdults'];
        $nbChildren = $_POST['nbChildren'];
        $stay = $_POST['stay'];

        array_set($data, 'customerRef', $customerRef);
        array_set($data, 'name',$name);
        array_set($data, 'nb', $nbAdults);
        array_set($data, 'stay', $stay);

        return $this->app()->make('twig.view')->render('info.twig',$data);
    }

    public function save(){
        $data = array();
        $customerRef = $_POST['customerRef'];
        $name = $_POST['name'];
        $nbAdults = $_POST['nbAdults'];
        $nbChildren = $_POST['nbChildren'];
        $stay = $_POST['stay'];

        array_set($data, 'customerRef', $customerRef);
        array_set($data, 'name',$name);
        array_set($data, 'nb', $nbAdults);
        array_set($data, 'nb', $nbChildren);
        array_set($data, 'stay', $stay);

        return $this->app()->make('twig.view')->render('info.twig',$data);
        var_dump($stay);die();

    }

}