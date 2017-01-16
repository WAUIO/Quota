<?php namespace App\Http\Controller;

use App\DatabaseConnection\PDOConnection;
use App\Utils\Migration;
use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller\WebhookController;
use App\Utils\HtmlToText;

class HookController extends WebhookController
{
    protected $routes = [
        "item.create" => 'itemCreate',
        "item.update" => 'itemCreate',
        "item.delete" => 'itemDelete'
    ];

    public function itemCreate(Request $request)
    {
        $migration = new Migration();
        $item_id = intval($request->get('item_id'));
        $item = \PodioItem::get_basic( $item_id);
        $app_id = $item->app->app_id;
        $migration->saveItem($app_id, $item);
    }

    public function itemDelete(Request $request)
    {
        $item_id = intval($request->get('item_id'));
        $app_id = $_POST['app_id'];
        $this->deleteItem($app_id, $item_id);
    }

    public function deleteItem($app_id, $item_id)
    {
        //app_id
        $id_app_houses         = 17063114;
        $id_app_rooms          = 17063267;
        $id_app_restaurants    = 17063393;
        $id_app_activities     = 17063389;
        $id_app_transports     = 17063391;
        $id_app_places         = 17063425;

        $table = "";

        switch ($app_id){
            case $id_app_houses:
                $table = "house";
                break;
            case $id_app_rooms:
                $table = "room";
                break;
            case $id_app_restaurants:
                $table = "restaurant";
                break;
            case $id_app_activities:
                $table = "activity";
                break;
            case $id_app_transports:
                $table = "transport";
                break;
            case $id_app_places:
                $table = "place";
                break;
        }

        $instance = new PDOConnection();
        $instance->delete("DELETE FROM ".$table." WHERE item_id = ".$item_id);
    }
}
