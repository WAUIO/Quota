<?php
/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 11/11/16
 * Time: 14:55
 */

namespace App\Model;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Task extends Eloquent
{
    protected $connection = 'default';

    //Deactivate Eloquent date field updated_at, created_at
    public $timestamps = false;
}
