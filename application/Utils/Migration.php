<?php
namespace App\Utils;

use App\DatabaseConnection\PDOConnection;
use League\Flysystem\Exception;

class Migration
{
    var $instance;

    public function __construct()
    {
        $this->instance = new  PDOConnection();
    }

    public function getItems($app)
    {
        $offset = 0;
        $limit = 2;

        $items = \PodioItem::filter($app['app_id'], array('limit' => $limit, 'offset' => $offset, 'sort_by' => 'created_on'));
        $this-> saveItem($app['app_name'], $items);

        try{
            do {
                $items = \PodioItem::filter($app['app_id'], array('limit' => $limit, 'offset' => $offset, 'sort_by' => 'created_on'));

                $this-> saveItem($app['app_name'], $items);

                //increase for next heap
                $offset += $limit;

            } while ($items->total > $offset);
        }catch(Exception $e){
            dump_var($e->getMessage());
        }
    }

    //Insert or Update item
    public function saveItem($app_name, $items){
        //app_id
//        $houses         = 17063114;
//        $rooms          = 17063267;
//        $restaurants    = 17063393;
//        $activities     = 17063389;
//        $transports     = 17063391;
//        $place          = 17063425;

        foreach ($items as $item) {
            $query = "";
            $dataItem = $this->getDataItem($item);

            switch (strtolower($app_name)){
                case 'houses':
                    if(!array_key_exists('title',$dataItem)){
                        $dataItem = $this->array_insert_before(1, $dataItem, 'title', "");
                    }
                    $table = "house";
                    $query = "INSERT INTO ".$table." (item_id, house_title, others) VALUES (:itemid, :title, :others)
                              ON DUPLICATE KEY UPDATE house_title = VALUES(house_title), others = VALUES(others)";
                    break;

                case 'rooms':
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

                case 'restaurants':
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

                case 'activities':
                    if(!array_key_exists('price-2',$dataItem)){
                        $dataItem = $this->array_insert_before(1, $dataItem, 'price2', "");
                    }
                    $table = "activity";
                    $query = "INSERT INTO ".$table." (item_id, price, others) VALUES (:itemid, :price2, :others)
                              ON DUPLICATE KEY UPDATE price = VALUES(price), others = VALUES(others)";
                    break;

                case 'transports':
                    if(!array_key_exists('price-2',$dataItem)){
                        $dataItem = $this->array_insert_before(1, $dataItem, 'price2', "");
                    }
                    $table = "transport";
                    $query = "INSERT INTO ".$table." (item_id, price, others) VALUES (:itemid, :price2, :others)
                              ON DUPLICATE KEY UPDATE price = VALUES(price), others = VALUES(others)";
                    break;

                case 'places':
                    $table = "place";
                    $query = "INSERT INTO ".$table." (item_id, others) VALUES (:itemid, :others)
                              ON DUPLICATE KEY UPDATE others = VALUES(others)";
                    break;
            }
            $this->instance->insert_migration($query, $dataItem);
        }
    }

    //Extract values ​​from the fields
    public function getDataItem($item){
        $dataItem = array();
        $exception = array();
        $others = array();
        $except = array();
        $tax_vignette = array(133125195, 133125196);

        //House app (field_id)
        $house_title            = 133123764;
        array_push($exception, $house_title);
        //Room app (field_id)
        $category               = 133125182;
        $room_house_id          = 133125179;
        array_push($exception, $category, $room_house_id);
        //Restaurant app (field_id)
        $menu                   = 133126303;
        $meals                  = 133188371;
        $restaurant_house_id    = 133126301;
        array_push($exception, $menu, $meals, $restaurant_house_id);
        //Activities app (field_id)
        $activities_price       = 133126249;
        array_push($exception, $activities_price);
        //Transport app (field_id)
        $transport_price        = 133126280;
        array_push($exception, $transport_price);

        //$exception = array($house_title, $category, $room_house_id, $menu, $meals, $restaurant_house_id, $activities_price, $transport_price);
        $field = $item->fields;

        for($i = 0; $i<sizeof($field); $i++){
            $json = array();
            $value = null;

            $type =  $field[$i]->type;
            $external_id = $field[$i]->external_id;

            if(in_array($field[$i]->field_id, $exception)){
                if(in_array($type, ['number','calculation','duration','progress','email'])){
                    $except[$external_id] = $field[$i]->values;
                }

                if($type == 'text'){
                    $text = new HtmlToText();
                    $except[$external_id] = $text->html2text($field[$i]->values);
                }

                if( $type == 'category'){
                    $size = sizeof($field[$i]->values);
                    $val = "";
                    for($j = 0; $j<$size; $j++){
                        $slash = ($j+1 == $size)? "":"/";
                        $val .= $field[$i]->values[$j]['text'].$slash;
                    }
                    $except[$external_id] = $val;
                }

                if($type == 'app'){
                    // $except = app_item_id
                    $except[$external_id] = $field[$i]->values[0]->item_id;
                }

                if($type == 'embed'){
                    // $except = embed_id
                    $except[$external_id] = $field[$i]->values[0]->embed_id;
                }

                if($type == 'date'){
                    $except[$external_id] = $field[$i]->values['start']->format('d-m-Y H:i:s');
                }

            }else{
                $json['type'] = $type;
                $json['label'] = $field[$i]->label;

                if(in_array($type, ['number','calculation','duration','progress','email'])){
                    $value = $field[$i]->values;
                }

                if($type == 'money'){
                    $value = $field[$i]->values['value'];
                    $json['currency'] = $field[$i]->values['currency'];
                }

                if($field[$i]->type == 'text'){
                    $text = new HtmlToText();
                    $value = $text->html2text($field[$i]->values);
                }

                if( $type == 'category'){
                    $size = sizeof($field[$i]->values);

                    for($j = 0; $j<$size; $j++){
                        $value["value_".$j] = $field[$i]->values[$j]['text'];
                    }
                }

                if($type == 'app'){
                    // $value = app_id
                    $value = $field[$i]->values[0]->item_id;
                }

                if($type == 'embed'){
                    // $value = embed_id
                    $value = $field[$i]->values[0]->embed_id;
                }

                if($type == 'date'){
                    $value = $field[$i]->values['start']->format('d-m-Y H:i:s');
                }

                $json['value'] = $value;
                $others[$external_id] = $json;
            }
        }

//        if(strtolower($app_name) == "rooms"){
//            if(!array_key_exists('public-rate',$others)){
//                $json['type'] = "money";
//                $json['label'] = "Public rate";
//                $json['currency'] = "MGA";
//                $json['value'] = 0;
//                $others = $this->array_insert_before(1, $others, 'public-rate', $json);
//            }
//            if(!array_key_exists('vignet-3',$others)){
//                $json['type'] = "money";
//                $json['label'] = "Vignet";
//                $json['currency'] = "MGA";
//                $json['value'] = 0;
//                $others = $this->array_insert_before(1, $others, 'vignet-3', $json);
//            }
//            if(!array_key_exists('tax',$others)){
//                $json['type'] = "money";
//                $json['label'] = "Tax";
//                $json['currency'] = "MGA";
//                $json['value'] = 0;
//                $others = $this->array_insert_before(1, $others, 'tax', $json);
//            }
//        }

        $dataItem['item_id'] = $item->item_id;

        foreach ($except as $key => $value){
            $dataItem[$key] = $value;
        }


        echo$dataItem['others'] = json_encode($others, JSON_UNESCAPED_UNICODE)."<br/>";


        return $dataItem;
    }

    //get all apps in workspace
    public function getApps($space_id)
    {
        $apps = \PodioApp::get_for_space($space_id);
        $list_app = array();
        foreach ($apps as $value) {
            $app_id = $value->app_id;
            $app_name = $value->config['name'];

            $list_app[] = array("app_id" => $app_id, "app_name" => $app_name);
        }

        return $list_app;
    }

    //dump table structure
    public function dumpTable()
    {
        try {
            $dump = new Mysqldump('mysql:host=localhost;dbname=wm-database', 'root', '');
            $dump->start('C:\wamp2\www\Travel\dump.sql');
        } catch (\Exception $e) {
            echo 'mysqldump-php error: ' . $e->getMessage();
        }
    }

    //insert in array
    function array_insert_before($key, array $array, $new_key, $new_value) {
        $new = array();
        $i = 0;
        foreach ($array as $k => $value) {
            if ($i === $key) {
                $new[$new_key] = $new_value;
            }
            $i++;
            $new[$k] = $value;
        }
        return $new;
    }

}