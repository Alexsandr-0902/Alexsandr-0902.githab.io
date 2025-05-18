<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail ->CharSet = 'UTF-8';
$mail ->setLanguage('ru', 'phpmailer/language/');
$mail ->IsHTML(true);

//от кого письмо
$mail ->setFrom('info@fil.guru', 'фриланс');
//кому отправить
$mail ->addAdress('Volkov090289@yandex.ru');
//Тема письма
$mail ->Subject = 'Новая заявка';

//позиция
$hand = "Один";
if($_POST['hand'] == "left"){
    $hand = "два";
}

//Тело письма
$body = '<h1>Новая заявка</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].</p>;
}
if(trim(!empty($_POST['tel']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].</p>;
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].</p>;
}
if(trim(!empty($_POST['hand']))){
    $body.='<p><strong>Рука</strong> '.$hand['name'].</p>;
}
if(trim(!empty($_POST['age']))){
    $body.='<p><strong>Возраст</strong> '.$_POST['age'].</p>;
}
if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].</p>;

//прикрепить файл
if(!empty($_FILES['image']['tmp_name'], $filePath)){
    $fileAttach = $filePath;
    $body.='<p><strong>фото</strong>';
    $mail ->addAttachment($fileAttach);
    }
}
$mail->Body = $body;

//отправляем
if(!$mail->send()) {
    $message = 'Ошибка':
} else {
    $message ='Данные отправлены!';
}
$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>