<?php namespace App\Http\Controller;



use App\DatabaseConnection\PDOConnection;
use App\Utils\Prestation;
use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;
use App\Model\ClientModel;

class prestationController extends Controller
{
    public function prestation(){
        $table = array("transport", "activity");
        $array = $this->getService($table);
        return $this->app()->make('twig.view')->render('prestation.twig',['prestations' => $array]);
    }


    public function getService($table)
    {
        $array = array();
        $person = array();
        $group = array();

        foreach($table as $tab){
            $instance = new PDOConnection();
            $services = $instance->select("SELECT item_id, price, others FROM ".$tab." WHERE price NOT LIKE ''" );

            foreach ($services as $service){
                $prestation = new Prestation();
                $prestation->setItemId($service['item_id']);
                $prestation->setTable($tab);
                $prestation->setPrice($service['price']);
                $prestation->setOthers(json_decode($service['others']));

                if(strtolower($service['price']) == 'per person'){
                    $person[] = $prestation;
                }else{
                    $group[] = $prestation;
                }
            }
        }
        array_push($array, $person, $group);
        return $array;

    }
}
