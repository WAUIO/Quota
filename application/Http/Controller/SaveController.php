<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 08/11/16
 * Time: 12:38
 */

namespace App\Http\Controller;
use App\Model\Room;
use Symfony\Component\HttpFoundation\Request;
use Wau\Http\Controller;

class SaveController extends Controller
{

public function save(){
    $board=new Room();
    $id=$_GET['id'];
    $rest=$board->selectOthers($id);
    return json_encode($rest);
}
}