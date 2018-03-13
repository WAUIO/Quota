<?php
/**
 * Description :
 *
 *
 */

namespace App\Http\Controller;

use Wau\Http\Controller;
use Wau\Request;

define("AUTH_USER", "noreply@wau.co");
define("AUTH_PASSWD", "hWvJbNH22meK");
define("TRUSTED_ID", "waushare");
define("TRUSTED_SECRET", "9vU4ArfXycs3epwQaAzq58wvPQS1VkjRjBEHqLJKN8P1hirS2iyJD11lkVUVant0");
define("AUTH_TOKEN", "9DAE2E08814D0498A25D1E94DDCF380B748D5E17982A44D7C82D859959F248BC");


class FlowController extends Controller
{
    public function flow1 (Request $request)
    {
        $post         = empty($_POST) ? json_decode(file_get_contents('php://input'), true) : $_POST;
        $token        = array_get($post, 'token', null);
        $guestEmail   = array_get($post, 'email', null);
        $itemIdToTask = array_get($post, 'item_id', 0);
        $task_title   = array_get($post, 'title', 'No title');
        $task_desc    = array_get($post, 'description', 'No description');
        $due_date     = array_get($post, 'due_date', '2018-03-13');

        if ($token !== AUTH_TOKEN) {
            return [
                'success' => false,
                'message' => 'Forbidden'
            ];
        }
        if (is_null($guestEmail) || $itemIdToTask === 0) {
            return [
                'success' => false,
                'message' => 'email or item id is missing'
            ];
        }

        $this->auth();

//        $itemIdToTask = 802046193;

        //assign task to user
        return $this->assignTask($guestEmail, $itemIdToTask, [
            "text"        => $task_title,
            "description" => $task_desc,
            "due_date"    => $due_date
        ]);
    }


    protected function auth ()
    {
        \Podio::setup(TRUSTED_ID, TRUSTED_SECRET);
        \Podio::authenticate_with_password(AUTH_USER, AUTH_PASSWD);
    }


    protected function assignTask ($email, $itemId, $details)
    {
        try {
            $details = array_merge($details, [
                "responsible" => [
                    [
                        "type" => "mail",
                        "id"   => $email
                    ]
                ]
            ]);
            $task    = \PodioTask::create_for("item", $itemId, $details);
            return [
                'success' => true,
                'task'    => $task->link
            ];

        } catch (\Exception $e) {
            $returnValue = [
                'success' => false,
                'error'   => $e->body['error_description']
            ];
            return $returnValue;
        }
    }
}