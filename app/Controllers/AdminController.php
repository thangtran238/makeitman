<?php 
function viewProduct() {
  include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Models/database.php");
  $query = "SELECT count(`productID`) as qty from product";
  $res = $conn->query($query);
  $row = mysqli_fetch_array($res);
  return $row['qty'];
}
function viewAccount() {
  include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Models/database.php");
  $query = "SELECT count(`accountID`) as qty from account where status = 0";
  $res = $conn->query($query);
  $row = mysqli_fetch_array($res);
  return $row['qty'];
}
function viewPromotions() {
  include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Models/database.php");
  $query = "SELECT count(`promoID`) as qty from promotion";
  $res = $conn->query($query);
  $row = mysqli_fetch_array($res);
  return $row['qty'];
}

function showPromotions() {
  include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Models/database.php");
  $query = "SELECT promoID as qty from promotion";
  $res = $conn->query($query);
  return $res;
}

include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/user/show.php');
include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/product/show.php');
include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/promotion/show.php');
include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/product/create.php');
include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/promotion/create.php');
?>