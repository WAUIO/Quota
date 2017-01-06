<?php
/**
 * Created by PhpStorm.
 * User: rindra
 * Date: 06/01/2017
 * Time: 17:02
 */

namespace App\Http\Controller;


use Wau\Http\Controller;

class UserController extends Controller
{
    public function logout(){
        $_SESSION['user'] = null;
    }
}