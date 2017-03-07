<?php
/**
 * Description :
 *
 *
 */

namespace App\Http\Controller;


use CalculationResolver\CalculationResolver;
use Wau\Http\Controller;
use Wau\Request;

class JSResolver extends Controller
{
    public function postResolve (Request $request)
    {
        $code = $request->getContent();
        $cr = new CalculationResolver();
        return $cr->compileJs($code);
    }
}