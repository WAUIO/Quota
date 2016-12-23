<?php namespace App\Http\Controller;



use App\DatabaseConnection\PDOConnection;
use App\Model\QuotaPrestation;
use App\Utils\Prestation;
use App\Utils\PrestationQuota;
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

    public function prestationView(){
        $data = array();
        $prestation = $this->getPrestation();

        array_set($data, 'prestation', $prestation);

        return $this->app()->make('twig.view')->render('quotaprest.twig',$data);
    }

    public function getPrestation(){
        $client_id = $_SESSION['client']->id;
        $query = "SELECT * FROM quotaprestation WHERE id_client = ".$client_id;
        $instance = new PDOConnection();
        $result = $instance->select($query);

        $service = array();
        $other = array();
        $prestation[] = 0;
        $smaller = 100;
        $bigger = 0;

        foreach ($result as $res){
            $others = json_decode($res['others']);

            $service[] = $res['service'];
            $other[] = $others;

            $min = $others->pax_min;
            $max = $others->pax_max;
            $rate_service = $others->rate_service;

            $i = $min-1;
            if(strtolower($others->type_service) == "per person"){
                while($i < $max){
                    $prestation[$i] += $rate_service;
                    $i++;
                }
            }else{
                $number = $max - $min + 1;
                while($i < $max){
                    $prestation[$i] += $rate_service / $number;
                    $i++;
                }
            }

            //get the min and max pax
            if($smaller > $min){
                $smaller = $min;
            }
            if($bigger < $max){
                $bigger = $max;
            }
        }
        $all_prestation = ['service'=>$service, 'other'=>$other];

        $margin = 20;
        $vat = 20;
        return new PrestationQuota(array($smaller, $bigger, $prestation, $margin, $vat, $all_prestation));
    }

    public function getService($table)
    {
        $array = array();
        $person = array();
        $group = array();

        foreach($table as $tab){
            $instance = new PDOConnection();
            $services = $instance->select("SELECT * FROM ".$tab." WHERE price NOT LIKE ''" );

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

    public function showQuotaPrestation(){
        $client_prestation = new QuotaPrestation();
        $client = (Object)$_SESSION['client'];
        $id_cli = $client->id;
        $client_prestation->selectQuotaprestation($id_cli);
        return $id_cli;
    }

    public function prestationView(){
        return $this->app()->make('twig.view')->render('quotaprest.twig');
    }
}
