<?php

namespace App\Http\Controller;

use App\Model\ClientModel;
use App\Model\ExchangeModel;
use App\Utils\User;
use Wau\Http\Controller;
use Wau\Request;

class UserController extends Controller
{
    public function authenticate (Request $request)
    {
        //wm-database workspace
        $space_id = 4691756;
        $email = $request->get('login_email', '');
        $password = $request->get('login_password', '');
        $client_id = $this->app->config('podio.CLIENT_ID');
        $client_secret = $this->app->config('podio.CLIENT_SECRET');

        $return = array();
        $return['authenticated'] = false;
        $return['message'] = 'Combination of email/password is wrong';

        \Podio::setup($client_id, $client_secret);

        //try to authenticate first
        try {
            \Podio::authenticate_with_password($email, $password);
        } catch (\PodioInvalidGrantError $e) {
            return $return;

        } catch (\Exception $e) {
            $return['message'] = "Error has occured when trying to authenticate. Please retry.";
            return $return;

        }

        //only allow workspace member even if credentials are correct
        try {

            if ($member = $this->isUserAMemberOfWorkspace($space_id) !== false) {

                $this->fillSessionDatas(['member' => $member]);

                $return['authenticated'] = true;
                $return['message'] = 'You are authorized';

            } else {
                $return['message'] = 'Sorry, only members of wm-database workspace are allowed';

            }

        } catch (\PodioError $e) {
            $return['message'] = $e->getMessage();

        } catch (\Exception $e) {
            $return['message'] = $e->getMessage();

        }
        return $return;

    }


    /**
     * Fill the correct session datas
     *
     * @param array $additionalDatas
     */
    private function fillSessionDatas ($additionalDatas = [])
    {
        if (array_key_exists('member', $additionalDatas)) {
            $user = new User($additionalDatas['member']->profile);
            $_SESSION['user'] = $user;
        }

        if ($_SESSION['client'] == null) {
            $clientModel = new ClientModel();
            $_SESSION['client'] = $clientModel->getLastClient();
        }

        $exchange = new ExchangeModel();
        $exchange->getExchange();
    }


    /**
     * Define if logged user is member of given workspace
     *
     * @param $workspaceId
     * @return mixed
     */
    private function isUserAMemberOfWorkspace ($workspaceId)
    {
        $userDetails = \PodioUser::get();

        try {
            $allMembersOfWorkspace = \PodioSpaceMember::get_all($workspaceId);
        } catch (\Exception $e) {
            return false;
        }

        foreach ($allMembersOfWorkspace as $member) {
            if ($member->user->user_id == $userDetails->user_id) {
                return $member;
            }
        }
        return false;
    }

    public function logout ()
    {
        $_SESSION['user'] = null;
    }
}