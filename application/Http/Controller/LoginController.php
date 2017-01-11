<?php

namespace App\Http\Controller;

use App\Model\ClientModel;
use App\Model\ExchangeModel;
use App\Utils\Client;
use App\Utils\User;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;

class LoginController extends Controller
{
    public function authenticate(){
        $space_id = 4691756;
        $username = $_GET['email'];
        $password = $_GET['password'];
        $client_id = $this->app->config('podio.CLIENT_ID');
        $client_secret = $this->app->config('podio.CLIENT_SECRET');

        $return = "not authenticated";
        \Podio::setup($client_id, $client_secret);
        try {
            if(\Podio::authenticate_with_password($username, $password)){

                $auth = \PodioUser::get();
                $members = \PodioSpaceMember::get_all( $space_id );

                foreach ($members as $member){
                    if ($member->user->user_id == $auth->user_id){
                        $user = new User($member->profile);
                        $_SESSION['user'] = $user;

                        if($_SESSION['client'] == null){
                            $clientModel = new ClientModel();
                            $_SESSION['client'] = $clientModel->getLastClient();
                        }

                        $exchange = new ExchangeModel();
                        $exchange->getExchange();

                        $return = "authenticated";
                    }
                }
            }
        }
        catch (\PodioError $e) {
            // Something went wrong. Examine $e->body['error_description'] for a description of the error.
        }

        return $return;
    }

    public function logout(){
        $_SESSION['user'] = null;
        return $this->app()->make('twig.view')->render('login.twig');
        header('Location: /');
    }
}