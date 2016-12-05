<?php
/**
 * Description :
 *
 *
 */

namespace App\Console\Podio;


use League\Flysystem\Exception;
use Wau\Console\Podio\PodioCommandAbstract;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\DatabaseConnection\PDOConnection;
use App\Utils\HtmlToText;
use App\Utils\Migration;

class appGetItems extends PodioCommandAbstract
{
    protected function configure() {
        $this->setName('appGetItems')
            ->setDescription('Get ALL App items')
            ->addArgument('app_id', InputArgument::REQUIRED, 'AppId');
    }

    protected function execute(InputInterface $input, OutputInterface $output) {
        $this->migrate();
    }

    public function migrate()
    {
        $migrate = new Migration();
        $space_id = 4691756;

        $list_app = $migrate->getApps($space_id);

        foreach ($list_app as $app){
            $app_id = $app['app_id'];
            $app_name = $app['app_name'];

            $migrate->getItems($app);
            echo $app_id." ".$app_name."<br/>";
        }
    }
    //    public function getItem($app_id, $offset = 0)
//    {
//        $limit = 500;
//        $items = \PodioItem::filter($app_id, array('limit' => $limit, 'offset' => $offset, 'sort_by' => 'created_on'));
//
//        static $storage = [];
//
//        foreach ($items as $item) {
//            $this->incre++;
//            $storage [] = $item;
//        }
//
//        //increase for next heap
//        $offset += $limit;
//
//        if( $items->total > $offset ){
//            self::getItem( $app_id, $offset);
//        }
//
//        return $storage;
//    }

    //$list_item = array_merge($list_item,self::getItems( $app_id, $offset));
    public function getItems($app_id)
    {
        $offset = 0;
        $limit = 100;

        try{
            do {
                $items = \PodioItem::filter($app_id, array('limit' => $limit, 'offset' => $offset, 'sort_by' => 'created_on'));

                $this-> saveItem($app_id, $items);

                //increase for next heap
                $offset += $limit;

            } while ($items->total > $offset);
        }catch(Exception $e){
            dump_var($e->getMessage());
        }

    }

    public function saveItem($app_id, $items){
        //app_id
        $houses         = 17063114;
        $rooms          = 17063267;
        $restaurants    = 17063393;
        $activities     = 17063389;
        $transports     = 17063391;
        $place          = 17063425;

        foreach ($items as $item) {
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
            $instance->insert($query, $dataItem);
        }
    }

    public function getDataItem($item){
        $exception = array();
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