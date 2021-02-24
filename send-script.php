<?php
$mailToSend = "kson.eu@gmail.com";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["email"];
    $antiSpam = $_POST["honey"];

    $errors = Array();
	  $return = Array();

    if (empty($antiSpam)) {

        //tutaj cała reszta skryptu który mieliśmy wcześniej (od 23 do 49)
        if (count($errors) > 0) {
            $return["errors"] = $errors;
        } else {
            ...
        }

    } else {
        $return["status"] = "ok";
    }

    header("Content-Type: application/json");
    echo json_encode($return);
}