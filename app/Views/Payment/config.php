<?php 
$fullname = $_POST["name"];
$phone = $_POST["phone"];
$address = $_POST["address"];
$dateTime = date('d-m-Y H:i:s');



echo "fullname:".$fullname. "<br>";
echo "phone:".$phone. "<br>";
echo "address:".$address. "<br>";
echo "dateTime:".$dateTime. "<br>";


?>