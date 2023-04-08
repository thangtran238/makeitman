<?php 
function viewProduct() {
  include("../Models/database.php");
  $query = "SELECT count(`productID`) as qty from product";
  $res = $conn->query($query);
  $row = mysqli_fetch_array($res);
  return $row['qty'];
}
function viewAccount() {
  include("../Models/database.php");
  $query = "SELECT count(`accountID`) as qty from account where status = 0";
  $res = $conn->query($query);
  $row = mysqli_fetch_array($res);
  return $row['qty'];
}
function viewPromotions() {
  include("./Models/database.php");
  $query = "SELECT count(`promoID`) as qty from promotion";
  $res = $conn->query($query);
  $row = mysqli_fetch_array($res);
  return $row['qty'];
}

function showPromotions() {
  include("../Models/database.php");
  $query = "SELECT promoID as qty from promotion";
  $res = $conn->query($query);
  return $res;
}

include('./Views/admin/user/show.php');
include('./Views/admin/product/show.php');
include('./Views/admin/promotion/show.php');
include('./Views/admin/product/create.php');
include('./Views/admin/promotion/create.php');
?>