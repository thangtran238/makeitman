<?php 

function appendProduct() {
  include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Models/database.php');
  if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $qty = $_POST['quantity'];
    $category = $_POST['category'];
    $price = $_POST['price'];
    $des = $_POST['description'];
    $file = $_FILES['image'];
    $filename = $file['name'];
    $showIDQuery = "SELECT CONCAT('pr', CAST(SUBSTR(productID, 3) AS UNSIGNED)) AS productID FROM product ORDER BY CAST(SUBSTR(productID, 3) AS UNSIGNED) DESC LIMIT 1";
    $res = $conn->query($showIDQuery);
    $stringID = mysqli_fetch_array($res)['productID'];  
    $id = (int)(substr($stringID,2)) + 1;
    if (!empty($filename)) {
      $path = "/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/public/img/" . basename($filename);
      move_uploaded_file($file['tmp_name'],$path);
      $insertQuery = "INSERT INTO `product`(`productID`, `pro_title`, `qty`, `categoryID`, `promoID`, `price`, `pro_des`, `image`) 
                      VALUES ('PR$id','$name','$qty','$category','0','$price','$des','$filename')";

      $conn->query($insertQuery);
      }
    }
  }

appendProduct();

?>