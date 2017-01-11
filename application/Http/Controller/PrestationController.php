<?php namespace App\Http\Controller;

use App\DatabaseConnection\PDOConnection;
use App\Model\PrestationModel;
use App\Utils\Prestation;
use App\Utils\PrestationQuota;
use Wau\Http\Controller;

class PrestationController extends Controller
{
    //edit prestation
    public function prestation(){
        $data = array();
        $table = array("transport", "activity");
        $array = $this->getService($table);

        array_set($data, 'title', 'Benefit : service offered');
        array_set($data, 'prestations', $array);

        return $this->app()->make('twig.view')->render('prestation.twig',$data);
    }

    //show prestation quotation
    public function quotaPrestation()
    {
        $data = array();
        $prestation = $this->getPrestation($_SESSION['client']->id);


        array_set($data, 'title', 'Benefit quotation');
        array_set($data, 'prestation', $prestation);

        return $this->app()->make('twig.view')->render('quotaPrestation.twig', $data);
    }

    // save Prestation
    public function savePrestation(){
        $prestationModel = new PrestationModel();
        $all_data = $_GET['all_data'];
        $id_client = $_SESSION['client']->id;

        foreach ($all_data as $data){
            $service = $data['service'];
            $others = $data['others'];

            $array  =  array('id_client'=>$id_client, 'service'=>$service, 'others'=>json_encode($others));
            $prestationModel->insertToQuotaprestation($array);
        }
        return $all_data;
    }

    //get all services
    public function getService($table)
    {
        $array = array();
        $person = array();
        $group = array();
        $prestationModel = new PrestationModel();

        foreach($table as $tab){
            $services = $prestationModel->getServices($tab);

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

    //select client prestation
    public function getPrestation($client_id){
        $service = array();
        $other = array();
        $prestation[] = 0;
        $smaller = 100;
        $bigger = 0;

        $prestationModel = new PrestationModel();
        $result = $prestationModel->getPrestation($client_id);

        if($result == null){
            return null;
        }else{
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
                    while($i < $max){
                        $prestation[$i] += $rate_service / ($i+1);
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
    }
}
