<?php
/**
 * Created by PhpStorm.
 * User: rindra
 * Date: 07/12/2016
 * Time: 14:58
 */

namespace App\Utils;


class Client
{
    var $id;
    var $reference;
    var $name;
    var $number_child;
    var $number_adult;


    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    public function getReference()
    {
        return $this->reference;
    }

    public function setReference($reference)
    {
        $this->reference = $reference;
        return $this;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    public function getNumberChild()
    {
        return $this->number_child;
    }

    /**
     * @param mixed $number_child
     * @return Client
     */
    public function setNumberChild($number_child)
    {
        $this->number_child = $number_child;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getNumberAdult()
    {
        return $this->number_adult;
    }

    /**
     * @param mixed $number_adult
     * @return Client
     */
    public function setNumberAdult($number_adult)
    {
        $this->number_adult = $number_adult;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getStartDate()
    {
        return $this->start_date;
    }

    /**
     * @param mixed $start_date
     * @return Client
     */
    public function setStartDate($start_date)
    {
        $this->start_date = $start_date;
        return $this;
    }
    var $start_date;
}