<?php namespace App\Http\Middleware;


use Wau\Http\Middleware\MiddlewareAbstract;

class AuthMiddleware extends MiddlewareAbstract
//<<<<<<< HEAD
//{
//    public function handle($args = null){
//        return true;
//    }
//
//=======
{
    protected function controlMail($user)
{
    $mail = $user->mail[0];
    $a = strpos($mail, "wau.solutions");
    $b = strpos($mail, "wau.co");
    $c = strpos($mail, "wau.travel");
    if ($a == false && $b == false && $c == false) {
        //MiddlewareAbstract::down();
        return $this->app()->abort($this->app()->make('twig.view')->render('errors/403.twig'), 403);
    } else {

        return true;
    }
}

    public function handle($args = null){

        $user_id=$_SESSION["oauth"]->ref["id"];
        \Podio::setup(
            $this->app->config('podio.CLIENT_ID'),
            $this->app->config('podio.CLIENT_SECRET')
        );
        \Podio::authenticate(
            'refresh_token',
            array('refresh_token'=>$_SESSION["oauth"]->refresh_token));
        $user=\PodioContact::get_for_user($user_id);

        return $this->controlMail($user);

    }
}