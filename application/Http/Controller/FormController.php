<?php

namespace App\Http\Controller;


use Wau\Http\Controller;

class FormController extends Controller
{
    public function attachHook()
    {
        if (!empty($_GET["url"]) || !empty($_GET["type"]) || !empty($_GET["ref_type"]) || !empty($_GET["ref_id"])) {

            try {
                $hook_id = \PodioHook::create($_GET['ref_type'], $_GET['ref_id'], array(
                    "url" => $_GET["url"],
                    "type" => $_GET['type']
                ));
                return $hook_id;
            } catch (\Exception $e) {
                return $e->getMessage();
            }
        }
    }

    //function to get webhook
    public function getWebhook($ref_type, $ref_id)
    {
        $hooks = \PodioHook::get_for($ref_type, $ref_id);
        return $hooks;
    }

    public function form($request,$ref_type,$ref_id, $app_id)
    {
        $title = "";
        $selectType = array();
        //recuperation space
        switch ($ref_type) {
            case "space":
                $space = \PodioSpace::get($ref_id);
                $space_name = $space->name;
                $title = "Workspace: " . $space_name;

                $selectType = array(
                    "app.create",
                    "contact.create",
                    "contact.update",
                    "contact.delete",
                    "member.add",
                    "member.remove",
                    "status.create",
                    "status.update",
                    "status.delete",
                    "task.create",
                    "task.update",
                    "task.delete"
                );
                $fil_ariane = "<li><a href='/workspace'>Home</a></li>
                			 <li class=\"active\">$space_name</li>";
                break;
            case "app":
                $app = \PodioApp::get($ref_id);
                $app_name = $app->config['name'];
                $space_id = $app->space_id;
                $space_name = \PodioSpace::get($space_id)->name;

                $title = "App: " . $app->config['name'];
                $selectType = array(
                    "app.update",
                    "app.delete",
                    "comment.create",
                    "comment.delete",
                    "file.change",
                    "form.create",
                    "form.update",
                    "form.delete",
                    "item.create",
                    "item.update",
                    "item.delete"
                );
                $fil_ariane = "<li><a href='/workspace'>Home</a></li>
                			 <li><a href='/space/$space_id'>$space_name</a></li>
                			 <li class=\"active\">$app_name</li>";
                break;

            case "app_field":
                $selectType = array("item.create", "item.update", "item.delete");
                $title = "Fields";

                $app = \PodioApp::get($app_id);
                $app_name = $app->config['name'];
                $space_id = $app->space_id;
                $space_name = \PodioSpace::get($space_id)->name;
                $field = \PodioAppField::get( $app_id, $ref_id );
                $field_name = $field->external_id;
                $fil_ariane = "<li><a href='/workspace'>Home</a></li>
                	   <li><a href='/space/$space_id'>$space_name</a></li>
                	   <li><a href='/app/$app_id'>$app_name</a></li>
                	   <li class=\"active\">$field_name</li>";

                break;

            default:
                $title = "";
        }
        $listhooks = $this->getWebhook($ref_type, $ref_id);

        $output = $this->app()->make('twig.view')->render('listHook.twig', [
            'listhooks' => $listhooks
        ]);


        return $this->app()->make('twig.view')->render('form.twig',[
            'title'         => $title,
            'ref_type'      => $ref_type,
            'ref_id'        => $ref_id,
            'selectType'    => $selectType,
            'fil_ariane'    => $fil_ariane,
            'templateListTable'      => $output,
        ]);
    }
    //function show form
    public function listHook($request, $ref_type, $ref_id)
    {
        $title = "";

        //recuperation space

        if ($ref_type == "space") {

            $space = \PodioSpace::get($ref_id);

            $title = "Workspace: " . $space->name;
        } elseif ($ref_type == "app") {
            $app = \PodioApp::get($ref_id);
            $title = "App: " . $app->config['name'];

        } elseif ($ref_type == "app_field") {
            $title = "Fields";
        }
        $listhooks = $this->getWebhook($ref_type, $ref_id);

        return $this->app()->make('twig.view')->render('listHook.twig', [
            'title' => $title,
            'ref_type' => $ref_type,
            'ref_id' => $ref_id,
            'listhooks' => $listhooks
        ]);
    }

    public function verifyHook($request, $id){

        try{
            $hook  = \PodioHook::verify( $id);

        }catch (\Exception $e) {
            return $e->getMessage();

        }
    }
    public function deletehook($request, $id)
    {
        try {
            $hook_id = \PodioHook::delete($id);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }



}