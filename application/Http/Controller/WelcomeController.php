<?php namespace App\Http\Controller;


use Wau\Http\Controller;

class WelcomeController extends Controller
{

    public function index(){
        $currency = $this->currency();
        return $this->app()->make('twig.view')->render('form.twig',['currency'=>$currency]);
    }

    public function info(){
        return $this->app()->make('twig.view')->render('info.twig');
    }
    public function prestationView(){
        return $this->app()->make('twig.view')->render('quotaprest.twig');
    }
    public function currency(){
        $value=0;
//        try{
//            $xchangeUrl = 'http://www.commercialesolutions.com/samples.html';//http://xchange-madagascar.com/home/cours';
//            $ch = curl_init();
//            curl_setopt($ch, CURLOPT_URL, $xchangeUrl);
//            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//            $result = curl_exec ($ch);
       // var_dump($result);

//        curl_close($ch);
//            $xchangePage = new \DOMDocument();
//
//            $xchangePage->loadHTML($result);
//
//
//
//
//           $division=$xchangePage->getElementsByClassName('cours');
//           $child=$division->find('ul > li')->filter(':first');
//            foreach($child->getElementsByTagName('div') as $div){
//                if($div->getAttribute('class') == "col1 achat"){
//                    $value = $div->item(1)->nodeValue;
//                }
//            }

//
//        }catch(\Exception $e){
//            $e->getFile();
//            $e->getCode();
//            $e->getMessage();
//            $e->getTrace();
//        }
        return $value;

    }


}
