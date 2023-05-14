<?php require "./database.php";
session_start();
// error_reporting(0);
// if(isset($_SESSION['account'])):
//   print_r($_SESSION['account']);
// else:
//   echo "<h1> session account not set </h1>";
// endif;
if(isset($_POST["addcart"]) && !empty($_GET["productID"])):
  $idproduct = $_GET["productID"];
  $accountID=$_SESSION['account']['accountID'];
  if (isset($_SESSION['account'])){
    $query = "SELECT productID FROM cart WHERE productID ='$idproduct' AND accountID ='$accountID' ;";
    $result = mysqli_query($conn,$query);
    $rowCount = mysqli_num_rows($result);
    if($rowCount):
      echo "<script> alert( 'This product has exist in cart')</script>";
      header("location: modun.php");
    else:
      $query= "INSERT INTO cart(accountID,productID,qty) VALUES ('$accountID','$idproduct',1);";
      $result = mysqli_query($conn,$query); 
      echo "<script > alert( 'Adding successfull!')</script>";
      header("location: modun.php");
    endif;
  }else{
    header("location: ./requireaccount.php");
  }
endif;
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
  <style>
    .frame{
      position:relative;
      left:200px;
      display:grid;
      grid-template-columns: 1fr 1fr;
      gap:30px;
    }
  </style>
      <div class="frame col-md-4">
          <?php 
          $query= "select * from product;";
          $result = mysqli_query($conn,$query);
          while($rows=mysqli_fetch_assoc($result)):?>
          <form action="modun.php?productID=<?php echo $rows["productID"]?>" method="post">
            <div class="card" style="width: 18rem;">
              <img src="<?php echo $rows["img"];?>" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title"><?php echo $rows["pro_title"];?></h5>
                  <p class="card-text"><?php  echo $rows["pro_des"];?></p>
                  <p class="card-text"><?php  echo $rows["price"];?></p>
                  <input type="submit" class="btn btn-primary" name="addcart" value="add Cart">
                  <a href="#" class="btn btn-success">Order</a>
              </div>
            </div>
          </form> 
          <?php endwhile;?>            
      </div>
</body>
</html>