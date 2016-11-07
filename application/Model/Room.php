<?php

/**
 * Created by PhpStorm.
 * User: ninah
 * Date: 07/11/16
 * Time: 10:31
 */
class Room
{
    private $host="localhost";
    private $db="quotadb";
    private $user="root";
    private $pass="ninahhexadec";
    private $conn;

   public function __construct()
   {
       $this->conn = new PDO("mysql:host=".$this->host.";dbname=".$this->db,$this->user,$this->pass);

   }

   public function showData(){

   }
   public function insertData(){}

   public function deleteData(){}

   public function updateData(){}

}