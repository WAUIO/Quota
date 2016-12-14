<?php namespace App\Http\Controller;



use App\Utils\Migration;
use Wau\Http\Controller;
use App\DatabaseConnection\PDOConnection;
use App\Utils\HtmlToText;
use App\Utils\Mysqldump;


class MigrationController extends Controller
{

    public function migrate()
    {
        set_time_limit(0);
        $migrate = new Migration();
        $space_id = 4691756;

        $list_app = $migrate->getApps($space_id);

        foreach ($list_app as $app){
            $app_id = $app['app_id'];
            $app_name = $app['app_name'];


            if($app_id == 17063391){
                $migrate->getItems($app);
            }
            //$migrate->getItems($app);
        }

        return "";
    }
}