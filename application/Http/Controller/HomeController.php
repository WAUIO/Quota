<?php namespace App\Http\Controller;

use App\Model\ClientModel;

class HomeController extends RoomController{

    public function home(){
        $clientModel = new ClientModel();
        if($_SESSION['client'] == null){
            $client = $clientModel->getLastClient();
            if($client != null){
                $_SESSION['client'] = $client;
            }
        }
        $clients = $clientModel->selectAllClient();
        $client_id = $_SESSION['client']->id;
        $dataRoom = $this->getRoom($client_id);
        $dataPrestation = $this->getPrestation($client_id);
        $registration_room = array_keys($dataRoom);
        $registration_prestation = array_keys($dataPrestation);
        $allRegistration = array_merge( array_intersect($registration_room, $registration_prestation), array_diff($registration_room, $registration_prestation), array_diff($registration_prestation, $registration_room) );
        sort($allRegistration);

        array_set($data, 'title', 'Customer information');
        array_set($data, 'clients', $clients);
        array_set($data, 'allRegistration', $allRegistration);
        array_set($data, 'dataRoom', $dataRoom);
        array_set($data, 'dataPrestation', $dataPrestation);

        return $this->app()->make('twig.view')->render('home.twig', $data);
    }

    public function duplicateRegistration(){
        $active_registration = $_GET['active_registration'];
        $new_registration = $_GET['new_registration'];
        //Madagascar timezone +3
        $current_date = new \DateTime('now', new \DateTimeZone("+3"));

        $this->duplicateRegistrationRoom($active_registration, $new_registration, $current_date->format("Y-m-d H:i:s"));
        $this->duplicateRegistrationPrestation($active_registration, $new_registration, $current_date->format("Y-m-d H:i:s"));
    }

    public function deleteRegistration(){
        $active_registration = $_GET['active_registration'];

        $this->deleteRegistrationRoom($active_registration);
        $this->deleteRegistrationPrestation($active_registration);
    }
}