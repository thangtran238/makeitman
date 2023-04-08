
<?php


function appendProduct() {
  include('./app/Models/database.php');
  if (isset($_POST['submit-product'])) {
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
      $path = "./public/img/" . basename($filename);
      move_uploaded_file($file['tmp_name'],$path);
      $insertQuery = "INSERT INTO `product`(`productID`, `pro_title`, `qty`, `categoryID`, `promoID`, `price`, `pro_des`, `image`) 
                      VALUES ('PR$id','$name','$qty','$category','PROMO0','$price','$des','$filename')";

      $conn->query($insertQuery);
      }
    }
  }
appendProduct();
?>