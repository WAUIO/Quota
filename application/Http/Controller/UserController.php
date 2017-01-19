<?php

namespace App\Http\Controller;

use App\Model\ClientModel;
use App\Model\ExchangeModel;
use App\Utils\User;
use Wau\Http\Controller;
use Wau\Request;

class UserController extends Controller
{
    public function authenticate(Request $request){
        //wm-database workspace
        $space_id = 4691756;
        $email = $request->get('login_email', '');
        $password = $request->get('login_password', '');
        $client_id = $this->app->config('podio.CLIENT_ID');
        $client_secret = $this->app->config('podio.CLIENT_SECRET');

        $return = "not authenticated";
        \Podio::setup($client_id, $client_secret);
        try {
            if(\Podio::authenticate_with_password($email, $password)){

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
    }
}