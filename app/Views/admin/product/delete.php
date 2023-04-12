<?php
ob_start();
$n = "";
if(isset($_GET['id'])) {
  $n = $_GET['id'];
}
del($n);
function getDatabase($id)
{
  include('../app/Models/database.php');
  $sql_query = "SELECT CONCAT('PR', CAST(SUBSTR(productID, 3) AS UNSIGNED)) AS productID, pro_title,qty,category.typeof,price,pro_des,image FROM product,category 
  where product.categoryID = category.categoryID and CONCAT('PR', CAST(SUBSTR(productID, 3) AS UNSIGNED)) = '$id'  ORDER BY CAST(SUBSTR(productID, 3) AS UNSIGNED)";
  $res = $conn->query($sql_query);
  $row = mysqli_fetch_assoc($res);
  $title = $row['pro_title'];
  $qty = $row['qty'];
  $typeof = $row['typeof'];
  $img = $row['image'];
  $price = $row['price'];
  $pro_des = $row['pro_des'];
  $pro_promo = "";
  $array = ['pro_title' => $title, 'qty' => $qty, 'price' => $price, 'pro_des' => $pro_des, 'typeof' => $typeof, 'img' => $img, 'promo' => $pro_promo];
  return $array;
}

  function delData($id) {
    include('./app/Models/database.php');

    $sql_delete = "DELETE FROM product where `productID` = '$id'";
    return $conn->query($sql_delete);
  }

  function del($id) {
    $array = getDatabase($id);
    unlink("/public/img/".$array['img']);
    delData($id);
    ob_clean();
    header('Location: http://localhost/project/makeitman/public/');
    exit;
  }

?>