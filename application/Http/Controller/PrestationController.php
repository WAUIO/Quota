<?php namespace App\Http\Controller;

use App\Model\PrestationModel;
use App\Utils\Prestation;
use App\Utils\PrestationQuota;
use Wau\Http\Controller;
use Wau\Request;

class PrestationController extends Controller{

    //edit prestation
    public function prestation(){
        $prestationModel = new PrestationModel();
        $data = array();
        $table = array("transport", "activity");
        $array = $this->getService($table);


        $client_id = $_SESSION['client']->id;
        $registration = $prestationModel->selectRegistration($client_id);

        array_set($data, 'title', 'Services (add quotation)');
        array_set($data, 'prestations', $array);
        array_set($data, 'registration', $registration);

        return $this->app()->make('twig.view')->render('prestation.twig', $data);
    }

    //show prestation quotation
    public function quotaPrestation(){
        $data = array();
        $dataPrestation = $this->getPrestation($_SESSION['client']->id);

        array_set($data, 'title', 'Services quotation');
        array_set($data, 'dataPrestation', $dataPrestation);
        return $this->app()->make('twig.view')->render('quotaPrestation.twig', $data);
    }

    // save Prestation

    public function savePrestation(Request $request){
        $prestationModel = new PrestationModel();
        $all_data = $request->get('all_data');
        $id_client = $_SESSION['client']->id;
        $now = new \DateTime();

        foreach ($all_data as $data){
            $service = $data['service_title'];
            $others = $data['others'];
            $registration = $data['registration'];

            $array  =  array('id_client'=>$id_client, 'service'=>$service, 'others'=>json_encode($others), 'registration'=>$registration, 'date'=>$now->format('Y-m-d H:i:s'));
            $prestationModel->insertToQuotaprestation($array);
        }
        return $all_data;
    }

    //delete prestation quotation
    public function deleteQuotaPrestation(){
        $id_prestation = $_GET['id_item'];
        $prestationModel = new PrestationModel();
        $prestationModel->deleteQuotaPrestation($id_prestation);
    }

    //delete prestation quotation
    public function deleteRegistrationPrestation($registration){
        $prestationModel = new PrestationModel();
        $prestationModel->deleteRegistration($registration);
    }

    //duplicate prestation quotation
    public function duplicateRegistrationPrestation($registration, $new_registration, $current_date){
        $prestationModel = new PrestationModel();
        $prestationModel->duplicateRegistration($registration, $new_registration, $current_date);
    }

    public function updatePrestation(Request $request){
        $prestationModel = new PrestationModel();
        $all_data = $request->get('all_data');
        foreach ($all_data as $data) {
            $id = $data['id'];
            $service = $data['service_title'];
            $others = $data['others'];

            $prestationModel->updatePrestation(['id' => $id, 'service' => $service, 'others' => json_encode($others)]);
        }
        return "ok!";
    }

    //get all services
    public function getService($table){
        $array = array();
        $per_person = array();
        $per_group = array();
        $prestationModel = new PrestationModel();

        foreach ($table as $tab) {
            $services = $prestationModel->getServices($tab);

            foreach ($services as $service) {
                $prestation = new Prestation();
                $prestation->setItemId($service['item_id']);
                $prestation->setTable($tab);
                $prestation->setPrice($service['price']);
                $prestation->setOthers(json_decode($service['others']));


                if(strtolower($service['price']) == 'per person'){
                    $per_person[] = $prestation;
                }else{
                    $per_group[] = $prestation;
                }
            }
        }
        array_push($array, $per_person, $per_group);
        return $array;

    }

    //select client prestation
    public function getPrestation($client_id){
        $prestationModel = new PrestationModel();
        $dataPrestation = array();

        $allRegistration = $prestationModel->selectRegistration($client_id);
        foreach($allRegistration as $reg){
            $service = array();
            $other = array();
            $id = array();
            $prestation[] = 0;
            $smaller = 100;
            $bigger = 0;

            $date_registration = null;
            $date1 = "2000-01-01 00:00:00";
            $registration = $reg['registration'];
            $result = $prestationModel->selectQuotaPrestation($client_id, $registration);

            if($result == null){
                return null;
            }else {
                foreach ($result as $res) {$date2 = $res['date'];

                    if(strtotime($date2)>strtotime($date1)){
                        $date1 = $date2;
                        $date_registration = $date2;
                    }
                    $others = json_decode($res['others']);

                    $id[] = $res['id'];
                    $service[] = $res['service'];
                    $other[] = $others;

                    $min = $others->pax_min;
                    $max = $others->pax_max;
                    $rate_service = $others->rate_service;

                    $i = $min - 1;
                    if (strtolower($others->type_service) == "per person") {
                        while ($i < $max) {
                            $prestation[$i] += $rate_service * $others->number_service;
                            $i++;
                        }
                    } else {
                        while ($i < $max) {
                            $prestation[$i] += ($rate_service * $others->number_service) / ($i + 1);
                            $i++;
                        }
                    }

                    //get the min and max pax
                    if ($smaller > $min) {
                        $smaller = $min;
                    }
                    if ($bigger < $max) {
                        $bigger = $max;
                    }
                }
                $all_prestation = ['id' => $id, 'service' => $service, 'other' => $other];
            }

            $dataPrestation[$registration] = new PrestationQuota(array($smaller, $bigger, $prestation, $all_prestation,(new \DateTime($date_registration))->format("D, d M Y")));
            unset($prestation);
        }
        return $dataPrestation;
    }
}
