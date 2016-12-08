<?php namespace App\Http\Controller;


use App\DatabaseConnection\PDOConnection;
use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller\WebhookController;
use App\Utils\HtmlToText;


class hookController extends WebhookController
{
    protected $routes = [
        "item.create" => 'itemCreate',
        "item.update" => 'itemCreate',
        "item.delete" => 'itemDelete'
    ];

    public function itemCreate(Request $request)
    {
        $item_id = intval($request->get('item_id'));

        $item = \PodioItem::get_basic( $item_id);
        $app_id = $item->app->app_id;
        $this->insertItem($app_id, $item);
    }

    public function itemDelete(Request $request)
    {
        $item_id = intval($request->get('item_id'));

        $app_id = $_POST['app_id'];
        $this->deleteItem($app_id, $item_id);

    }

    public function getDataItem($item){
        //House app (field_id)
        $house_title            = 133123764;

        //Room app (field_id)
        $category               = 133125182;
        $room_house_id          = 133125179;

        //Restaurant app (field_id)
        $menu                   = 133126303;
        $meals                  = 133188371;
        $restaurant_house_id    = 133126301;

        //Activities app (field_id)
        $activities_price       = 133126249;

        //Transport app (field_id)
        $transport_price        = 133126280;

        $exception = array($house_title, $category, $room_house_id, $menu, $meals, $restaurant_house_id, $activities_price, $transport_price);

        $others = array();
        $except = array();

        $field = $item->fields;

        for($i = 0; $i<sizeof($field); $i++){
            $json = array();
            $value = null;

            if(in_array($field[$i]->field_id, $exception)){

                $external_id = $field[$i]->external_id;

                if(in_array($field[$i]->type, ['number','calculation','duration','progress','email'])){
                    $except[$external_id] = $field[$i]->values;
                }

                if($field[$i]->type == 'text'){
                    $text = new HtmlToText();
                    $except[$external_id] = $text->html2text($field[$i]->values);
                }

                if( $field[$i]->type == 'category'){
                    $size = sizeof($field[$i]->values);
                    $val = "";
                    for($j = 0; $j<$size; $j++){
                        $slash = ($j+1 == $size)? "":"/";
                        $val .= $field[$i]->values[$j]['text'].$slash;
                    }
                    $except[$external_id] = $val;
                }

                if($field[$i]->type == 'app'){
                    // $except = app_item_id
                    $except[$external_id] = $field[$i]->values[0]->item_id;
                }

                if($field[$i]->type == 'embed'){
                    // $except = embed_id
                    $except[$external_id] = $field[$i]->values[0]->embed_id;
                }

                if($field[$i]->type == 'date'){
                    $except[$external_id] = $field[$i]->values['start']->format('d-m-Y H:i:s');
                }

            }else{
                if(in_array($field[$i]->type, ['number','calculation','duration','progress','email','money'])){
                    $value = $field[$i]->values;
                }

                if($field[$i]->type == 'text'){
                    $text = new HtmlToText();
                    $value = $text->html2text($field[$i]->values);
                }

                if( $field[$i]->type == 'category'){
                    $size = sizeof($field[$i]->values);

                    for($j = 0; $j<$size; $j++){
                        $value["value_".$j] = $field[$i]->values[$j]['text'];
                    }
                }

                if($field[$i]->type == 'app'){
                    // $value = app_id
                    $value = $field[$i]->values[0]->item_id;
                }

                if($field[$i]->type == 'embed'){
                    // $value = embed_id
                    $value = $field[$i]->values[0]->embed_id;
                }

                if($field[$i]->type == 'date'){
                    $value = $field[$i]->values['start']->format('d-m-Y H:i:s');
                }

                $label = $field[$i]->label;
                $external_id = $field[$i]->external_id;

                $json['label'] = $label;
                $json['value'   ] = $value;
                $others[$external_id] = $json;
            }
        }

        $dataItem = array();

        $dataItem['item_id'] = $item->item_id;

        foreach ($except as $key => $value){
            $dataItem[$key] = $value;
        }

        $dataItem['others'] = json_encode($others, JSON_UNESCAPED_UNICODE);

        return $dataItem;
    }

    public function insertItem($app_id, $item)
    {
        //app_id
        $houses         = 17063114;
        $rooms          = 17063267;
        $restaurants    = 17063393;
        $activities     = 17063389;
        $transports     = 17063391;
        $place          = 17063425;

        $query = "";
        $dataItem = $this->getDataItem($item);

        switch ($app_id){
            case $houses:
                if(!array_key_exists('title',$dataItem)){
                    $dataItem = $this->array_insert_before(1, $dataItem, 'title', "");
                }
                $table = "house";
                $query = "INSERT INTO ".$table." (item_id, house_title, others) VALUES (:itemid, :title, :others)
                              ON DUPLICATE KEY UPDATE house_title = VALUES(house_title), others = VALUES(others)";

                break;
            case $rooms:
                if(!array_key_exists('for-hotel',$dataItem)){
                    $dataItem = $this->array_insert_before(1, $dataItem, 'forhotel', "");
                }
                if(!array_key_exists('room-category',$dataItem)){
                    $dataItem = $this->array_insert_before(2, $dataItem, 'roomcategory', "");
                }
                $table = "room";
                $query = "INSERT INTO ".$table." (item_id, house_id, category, others) VALUES (:itemid, :forhotel, :roomcategory, :others)
                              ON DUPLICATE KEY UPDATE house_id = VALUES(house_id), others = VALUES(others)";
                break;
            case $restaurants:
                if(!array_key_exists('house',$dataItem)){
                    $dataItem = $this->array_insert_before(1, $dataItem, 'house', "");
                }
                if(!array_key_exists('menu',$dataItem)){
                    $dataItem = $this->array_insert_before(2, $dataItem, 'menu', "");
                }
                if(!array_key_exists('meals',$dataItem)){
                    $dataItem = $this->array_insert_before(3, $dataItem, 'meals', "");
                }
                $table = "restaurant";
                $query = "INSERT INTO ".$table." (item_id, house_id, menu, meals, others) VALUES (:itemid, :house, :menu, :meals, :others)
                              ON DUPLICATE KEY UPDATE house_id = VALUES(house_id), menu = VALUES(menu), meals = VALUES(meals), others = VALUES(others)";
                break;
            case $activities:
                if(!array_key_exists('price-2',$dataItem)){
                    $dataItem = $this->array_insert_before(1, $dataItem, 'price2', "");
                }
                $table = "activity";
                $query = "INSERT INTO ".$table." (item_id, price, others) VALUES (:itemid, :price2, :others)
                              ON DUPLICATE KEY UPDATE price = VALUES(price), others = VALUES(others)";
                break;
            case $transports:
                if(!array_key_exists('price-2',$dataItem)){
                    $dataItem = $this->array_insert_before(1, $dataItem, 'price2', "");
                }
                $table = "transport";
                $query = "INSERT INTO ".$table." (item_id, price, others) VALUES (:itemid, :price2, :others)
                              ON DUPLICATE KEY UPDATE price = VALUES(price), others = VALUES(others)";
                break;
            case $place:
                $table = "place";
                $query = "INSERT INTO ".$table." (item_id, others) VALUES (:itemid, :others)
                              ON DUPLICATE KEY UPDATE others = VALUES(others)";
                break;
        }

        $instance = new  PDOConnection();
        $instance->executeQuery($query, $dataItem);

    }

    public function deleteItem($app_id, $item_id)
    {
        //app_id
        $houses         = 17063114;
        $rooms          = 17063267;
        $restaurants    = 17063393;
        $activities     = 17063389;
        $transports     = 17063391;
        $place          = 17063425;

        $table = "";

        switch ($app_id){
            case $houses:
                $table = "house";
                break;
            case $rooms:
                $table = "room";
                break;
            case $restaurants:
                $table = "restaurant";
                break;
            case $activities:
                $table = "activity";
                break;
            case $transports:
                $table = "transport";
                break;
            case $place:
                $table = "place";
                break;
        }

        $instance = new PDOConnection();
        $instance->delete("DELETE FROM ".$table." WHERE item_id = ".$item_id);

    }

    public function auth () {
        \Podio::setup(
            $this->app->config("podio.CLIENT_ID"),
            $this->app->config("podio.CLIENT_SECRET")
        );


        \Podio::authenticate_with_password(
            $this->app->config('podio.USERNAME'),
            $this->app->config('podio.PASSWORD')
        );
    }

}
