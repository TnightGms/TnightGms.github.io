<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "tnight@mail.ee";  // <-- Aquí llegan los mensajes
    $subject = "Nuevo mensaje desde Tnight Games V2";
    $body = "Nombre: $name\nEmail: $email\n\nMensaje:\n$message";
    $headers = "From: $email";

    if(mail($to, $subject, $body, $headers)){
        echo "Mensaje enviado correctamente";
    } else {
        echo "Error al enviar el mensaje";
    }
} else {
    echo "Método no permitido";
}
?>
