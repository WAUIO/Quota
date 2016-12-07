<?php namespace App\Http\Controller;



use App\DatabaseConnection\PDOConnection;
use App\Utils\Prestation;
use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;

class prestationController extends Controller
{
    public function prestation(){

        $array[] = $this->getPrestation("Per person");
        $array[] = $this->getPrestation("Per booking");

        return $this->app()->make('twig.view')->render('prestation.twig',['prestations' => $array]);
    }


    public function getPrestation($type)
    {
        $array = array();

        $instance = new PDOConnection();
        $activities = $instance->select("SELECT * FROM activity WHERE price = '".$type."' UNION SELECT * FROM transport WHERE price = '".$type."'" );
        foreach ($activities as $activity){
            $prestation = new Prestation();
            $prestation->setItemId($activity['item_id']);
            $prestation->setTitle(json_decode($activity['others'])->title->value);
            $array[] = $prestation;
        }
        return $array;
    }
}
