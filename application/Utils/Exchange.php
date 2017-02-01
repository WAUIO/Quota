<?php

namespace App\Utils;

use League\Flysystem\Exception;

class Exchange{

    var $exchange = array();

    function __construct($eq){
        //$eq = 0 => EUR
        //$eq = 1 => USD
        //$eq = 2 => CNY
        //$eq = 3 => HKD.....
        try{
            $ch = curl_init("http://xchange-madagascar.com/home/cours");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
            $content = curl_exec($ch);
            curl_close($ch);

            $this->dom = new \DomDocument();
            libxml_use_internal_errors(true);
            $this->dom->loadHTML($content);
            libxml_use_internal_errors(false);

            preg_match('/\d+(\.\d+)?/', $this->getElementByClass($this->dom, 'div', 'col1 achat', $eq)->nodeValue, $achat);
            preg_match('/\d+(\.\d+)?/', $this->getElementByClass($this->dom, 'div', 'col1 vente', $eq)->nodeValue, $vente);
            preg_match('/\d+(\.\d+)?/', $this->getElementByClass($this->dom, 'div', 'col1 mid', $eq)->nodeValue, $mid);
        }
        catch (Exception $e){

        }

        return array_push($this->exchange, $achat[0], $vente[0], $mid[0]);
    }

    function getElementByClass($parentNode, $tagName, $className, $offset) {
        $response = false;
        $childNodeList = $parentNode->getElementsByTagName($tagName);
        $tagCount = 0;
        for ($i = 0; $i < $childNodeList->length; $i++) {
            $temp = $childNodeList->item($i);
            if (stripos($temp->getAttribute('class'), $className) !== false) {
                if ($tagCount == $offset) {
                    $response = $temp;
                    break;
                }
                $tagCount++;
            }
        }

        return $response;
    }
}