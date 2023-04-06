<?php
ob_start();
$n = "";
if(isset($_GET['id'])) {
  $n = $_GET['id'];
}
delData($n);
ob_clean();
header('Location: http://localhost/project/makeitman/public/');
exit;

function delData($id) {
  include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Models/database.php');
  $sql_delete = "DELETE FROM promotion where `promoID` = '$id'";
  return $conn->query($sql_delete);
}
