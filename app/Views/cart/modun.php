<?php require "../../Models/database.php";
session_start();
error_reporting(0);

// $R = $result->fetch_all(MYSQLI_ASSOC);
// ---not done yet! need to solve--------------------------------------------------
$idproduct = $_GET["productID"];
if(!empty($_GET["productID"])):
  $_SESSION['cart']=[];
  $query= "select * from product where productID='$idproduct';";
  $result = mysqli_query($conn,$query);
  $data=mysqli_fetch_assoc($result);
  $item=[
    $idproduct=>[
      "pro_title"=>$data["pro_title"],
      "qty"=>$data["qty"],
      "categoryID"=>$data["categoryID"],
      "promoID"=>$data["promoID"],
      "price"=>$data["price"],
      "pro_des"=>$data["pro_des"],
      "img"=>$data["img"],
      "amount"=>$soluong
    ]
  ];
endif;
if(!empty($_SESSION["cart"])){
  echo "<pre>";
  print_r($_SESSION["cart"]);
  echo "</pre>";
}
//-------------------------------------------------------------------
?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</head>
  <body>
    <a href="cart.php" ><button style="display:flex;">cart<?php echo "<p style='color:red;'> $soluong</p>" ?></button></a>
    <h1>our product</h1>
     </body>
</html>
</head>
<body>
      <div class="frame col-md-4">
          <?php 
          $query= "select * from product;";
          $result = mysqli_query($conn,$query);
          while($rows=mysqli_fetch_assoc($result)):?>
          <form action="modun.php?productID=<?php echo $rows["productID"]?>" method="post">
            <div class="card" style="width: 18rem;">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title"><?php echo $rows["pro_title"];?></h5>
                <p class="card-text"><?php  echo $rows["pro_des"];?></p>
                <p class="card-text"><?php  echo $rows["price"];?></p>
                <a class="btn btn-primary"><input type="submit" name="addcart" value="add Cart"></a>
                <a href="#" class="btn btn-success">Order</a>
            </div>
            </div>
            </form> 
          <?php endwhile;?>            
      </div>
</body>
</html>