
<?php 
require "../../Models/database.php";
session_start();

// get username account;
$user=$_SESSION['account']['username'];
$accountID=$_SESSION['account']['accountID'];
// error_reporting(0);
// $total=0;
// // to get amount of the product..
// if(isset($_SESSION["cart"])):
//     $sl = count($_SESSION["cart"]);
// endif;
// // delete function______________________
// $del = $_GET['del'];
// if(!empty($del)):
//     unset($_SESSION['cart'][$del]);
//     header("location:cart.php");
// endif;
// // incre and minus a product ____________________
// $incre =$_GET['incre'];
// $idProC = $_GET['idProC'];
// if(isset($idProC)):
//     if($incre):
//         $_SESSION['cart'][$idProC]['amount']+=1;
//         header("location: ./cart.php");
//     else:
//         $_SESSION['cart'][$idProC]['amount']-=1;
//         if(($_SESSION['cart'][$idProC]['amount'])<1):
//             $_SESSION['cart'][$idProC]['amount']=1;
//         endif;
//     endif;
// endif;

// Get data from cart table____:
$q="SELECT * FROM product WHERE productID IN(SELECT productID from cart where accountID='$accountID');";
$result=$conn->query($q);
$data = array();
while ($row = mysqli_fetch_assoc($result)){
    $data[]=$row; 
}
// RESORT THE DATA---
ksort($data);
// insert data into session SHOPPING_CART-------------------
if(!empty($data)):
    foreach($data as $key => $value):
        $id = $value["productID"];
        $array = [
                "pro_title"=>$value["pro_title"],
                "qty"=>$value["qty"],
                "categoryID"=>$value["categoryID"],
                "promoID"=>$value["promoID"],
                "price"=>$value["price"],
                "pro_des"=>$value["pro_des"],
                "img"=>$value["img"],
        ];
        $productc[$id]=$array;
    endforeach;
    $_SESSION['shopping_cart']=$productc;
// echo "<pre>";
// print_r($_SESSION['shopping_cart']);
// echo "</pre>";
endif;

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping cart</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        <?php include ("cart_style.css")?>
    </style>
</head>
<body>
    <form class="container" action='<?php $_SERVER['PHP_SELF'] ?>' method="post">
        <div class="header">
            <div class="cart_title">
                <div class="cart_name">
                    <h2> <?php if(isset( $_SESSION['shopping_cart'])) echo count($_SESSION['shopping_cart'])?></h2>
                    <h3>Shopping Cart</h3>
                    <a href="modun.php"><i class="fa fa-cart-plus"></i></a>
                </div>
            </div>
            <div class="cart_user">
                <div class="user_name"><h4><?php echo $user ?></h4></div>
                <div class="user_img"><img src="https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg" alt=""></div>
                <div class="logout"><a href="./login.php"><i class="fa-solid fa-arrow-right-from-bracket"></i></a></div>
            </div>
        </div>
        <?php 
        if($user): 
            if(!empty($_SESSION['shopping_cart'])):
                foreach ($_SESSION['shopping_cart'] as $key => $value):
        ?>
                    <div class="content">
                        <div class="frame-product-list">
                            <div class="product_cart">
                                <input type="checkbox" name="checkout_list[]" value="" id="check">
                                <div class="img"><img src="<?php echo $value["img"] ?>" alt=""></div>
                                <div class="product_name">
                                    <h5><?php echo $value["pro_title"] ?></h5>
                                </div>
                                <div class="product_price"><h4><?php echo $value["price"] ?></h4></div>
                                <div class="amount">
                                    <a  href="cart.php"><i class="fa-solid fa-circle-down fa-rotate-180"></i></a>
                                    <span></span>
                                    <a href="cart.php"><i class="fa-solid fa-circle-down"></i></a>
                                </div>
                                <div class="remove_udt_cart"><a href="cart.php"><i class="fa-solid fa-trash"></i></a></div>
                                <div class="amount_total">chua tinh</div>
                            </div>
                        </div>
                    </div>
        <?php            
                endforeach;
        ?>
                    <div class="footer">
                        <div class="frame-footer-checkout">
                            <input type="submit" name="checkout" class="checkout" value="checkout"> 
                        </div>        
                    </div>
        <?php 
            else:
                echo" <h1> Empty product!</h1>";
            endif;
        else:
            include "./requireaccount.php";
        endif;
        ?>
    </form>
<!--     
        // $arr_checkout_list= $_POST['checkout_list'];
        // if(isset($_POST['checkout']) ):
        //     if (isset($arr_checkout_list)) {
        //         # code...  
        //         print_r($arr_checkout_list); 
        //     }else{
        //         echo "aarray not isset";
        //     }
        // endif; -->
        

        <h1>
            - them tinh gia roi tong nua <br> 
            - lay them truong QTY tu cart <br>
            - loc cac du lieu can thiet
        </h1>
</body>
</html>