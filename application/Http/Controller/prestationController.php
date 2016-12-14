<?php namespace App\Http\Controller;



use App\DatabaseConnection\PDOConnection;
use App\Utils\Prestation;
use Wau\Http\Controller;
use App\Model\ClientModel;

class prestationController extends Controller
{
    public function prestation(){

        $array[] = $this->getPrestation("Per person");
        $array[] = $this->getPrestation("Per booking");

        $id=new ClientModel();
        $lastId=$id->getId();
        $id = $lastId[0];

        return $this->app()->make('twig.view')->render('prestation.twig',['prestations' => $array,'id'=>$id]);
    }


    public function getPrestation($type)
    {
        $array = array();

        $instance = new PDOConnection();
        $activities = $instance->select("SELECT * FROM activity WHERE price = '".$type."' UNION SELECT * FROM transport WHERE price = '".$type."'" );
        foreach ($activities as $activity){
            $prestation = new Prestation();

            $prestation->setItemId($activity['item_id']);
            $prestation->setOthers(json_decode($activity['others']));
            $prestation->setPrice($type);

            $array[] = $prestation;
        }
        return $array;
    }
}
