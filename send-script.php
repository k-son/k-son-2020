<?php

$mailToSend = "kson.eu@gmail.com";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $antiSpam = $_POST["honey"];

    $errors = Array();
	  $return = Array();

    if (empty($name)) { // jeżeli pusta wartość
        array_push($errors, "name");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { // sprawdzamy czy email ma zły wzór
        array_push($errors, "email");
    }
    if (empty($message)) {
        array_push($errors, "message");
    }

    if (empty($antiSpam)) { // honeypot musi być pusty by wiadomość została wysłana
      if (count($errors) > 0) {
          $return["errors"] = $errors;
      } else {
          // każde wysłanie wiadomości musi być poprzedzone ustawieniem nagłówków
          $headers  = "MIME-Version: 1.0" . "\r\n";
          $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
          $headers .= "From: ".$email."\r\n";
          $headers .= "Reply-to: ".$email;
          $message  = "
              <html>
                  <head>
                      <meta charset=\"utf-8\">
                  </head>
                  <body>
                      <div> Imię: $name</div>
                      <div> Email: <a href=\"mailto:$email\">$email</a> </div>
                      <div> Telefon: $phone</div>
                      <div> Temat: $subject</div>
                      <div> Wiadomość: </div>
                      <div> $message </div>
                  </body>
              </html>";

          if (mail($mailToSend, "Wiadomość ze strony K-SON" . " " . date("d-m-Y"), $message, $headers)) {
              $return["status"] = "ok";
          } else {
              $return["status"] = "error";
          }
      }
    }

    header("Content-Type: application/json");
    echo json_encode($return);
}