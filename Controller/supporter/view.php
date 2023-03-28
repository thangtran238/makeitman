<?php 
function viewProduct() {
  include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/Controller/database/connect.php");
  $query = "SELECT count(`productID`) as qty from product";
  $res = $conn->query($query);
  $row = mysqli_fetch_array($res);
  return $row['qty'];
}
function viewAccount() {
  include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/Controller/database/connect.php");
  $query = "SELECT count(`accountID`) as qty from account";
  $res = $conn->query($query);
  $row = mysqli_fetch_array($res);
  return $row['qty'];
}
function viewPromotions() {
  include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/Controller/database/connect.php");
  $query = "SELECT count(`promoID`) as qty from promotion";
  $res = $conn->query($query);
  $row = mysqli_fetch_array($res);
  return $row['qty'];
}




?>