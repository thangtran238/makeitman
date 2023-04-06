<?php 
function appendPromo() {
  include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Models/database.php');
  if (isset($_POST['submit-promote'])) {
    $name = $_POST['name'];
    $discount = $_POST['discount'];
    $status = $_POST['status'];
    $showIDQuery = "SELECT CONCAT('PROMO', CAST(SUBSTR(promoID, 6) AS UNSIGNED)) AS promoID
    FROM promotion ORDER BY CAST(SUBSTR(promoID, 6) AS UNSIGNED) DESC LIMIT 1";
    $res = $conn->query($showIDQuery);
    $stringID = mysqli_fetch_array($res)['promoID'];
    $id = (int)(substr($stringID,5)) + 1;
    echo $id;
    $insertQuery = "INSERT INTO `promotion`(`promoID`, `promo_name`, `discount`, `status`) 
    VALUES ('PROMO$id','$name','$discount','$status')";
    $conn->query($insertQuery);
  }
}
appendPromo();
?>