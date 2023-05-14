<?php 
require "../../Models/database.php";
session_start();
// get username account;
$user=$_SESSION['account']['username'];
$accountID=$_SESSION['account']['accountID'];



// function icreament the qty of the product cart.
// function increa_minus($idpro,$req,$conn)
// {
//         $query="UPDATE cart set qty=qty + 1 where productID ='HT13' AND accountID = 'ac01';";
//         $conn->query($query);
//         echo "id product: $idpro"."require: ".$req;
// }
// $idpro = $_GET["idpro"];
// $req = (int)$_GET["req"];
// if (isset($idpro)&& isset($req)&& !empty($idpro)&& !empty($req)) {
//     increa_minus("$idpro",$req,$conn);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
//     // header("location: ./cart.php");
// //    $dk= isset($req)&& isset($req)&& !empty($req)&& !empty($req);
// //    var_dump($dk);
// }


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
// $q="SELECT * FROM product WHERE productID IN(SELECT productID from cart where accountID='$accountID');";




// _____________    DELETE PRODUCT_____________

function delete_cart($idpro,$conn)
{
    $query = "DELETE FROM cart WHERE productID = '$idpro';";
    $conn ->query($query);
    echo "<script> alert('delete successfully')</script>";
    header("location: cart.php");
}

$iddel = $_GET['iddel'];
if( isset($iddel) && $iddel ){
    delete_cart($iddel,$conn);
}

// __________________________________________________________

//______________  INREAMEMT AND MINUS QUANTITY OF SHOPPING CART _________________________

function increament($idIncreament, $conn,$accountID)    
{
    $query = "SELECT qty FROM cart WHERE productID = '$idIncreament' AND accountID = '$accountID';";
    $result = $conn ->query($query);
    $row = mysqli_fetch_assoc($result);

    if ($row) {
        $qty = $row['qty'];
        $qty++;
    
        $query = "UPDATE cart SET qty = $qty WHERE accountID = '$accountID' AND productID = '$idIncreament';";
        $conn->query($query);
        header("location: cart.php");
    }
}


function minus($idIncreament, $conn,$accountID)    
{
    $query = "SELECT qty FROM cart WHERE productID = '$idIncreament' AND accountID = '$accountID';";
    $result = $conn ->query($query);
    $row = mysqli_fetch_assoc($result);

    if ($row) {
        $qty = $row['qty'];
        $qty--;
    
        $query = "UPDATE cart SET qty = $qty WHERE accountID = '$accountID' AND productID = '$idIncreament';";
        $conn->query($query);
        header("location: cart.php");
    }
}



$idinreament = $_GET['idinreament'];
$req = $_GET['req'];
$accountID=$_SESSION['account']['accountID'];

if(isset($idinreament) && $req ==1){
    increament($idinreament, $conn,$accountID);
    $req =0;
}else{
    if(isset($idinreament) && $req ==0){
        minus($idinreament, $conn,$accountID);
    }
}





































$query="SELECT product.productID, product.pro_title, product.img, product.price, 
       product.pro_des, cart.qty, 
       product.categoryID, product.promoID 
FROM product
JOIN cart ON product.productID = cart.productID
WHERE cart.accountID = '$accountID';";


$result=$conn->query($query);
$data = array();
while ($row = mysqli_fetch_assoc($result)){
    $data[]=$row; 
}

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
    $_SESSION['shopping_cart']= count($data)>0 ? $productc : [];
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
            if(!empty($_SESSION['shopping_cart']) and $_SESSION['shopping_cart'] !=[] ):
                foreach ($_SESSION['shopping_cart'] as $key => $value):
        ?>
                    <div class="content">
                        <div class="frame-product-list">
                            <div class="product_cart">
                                <input type="checkbox" name="checkout_list[]" value="<?php echo $key?>" id="check">
                                <div class="img"><img src="<?php echo $value["img"] ?>" alt=""></div>
                                <div class="product_name">
                                    <h5><?php echo $value["pro_title"] ?></h5>
                                </div>
                                <div class="product_price"><h4><?php echo $value["price"] ?></h4></div>
                                <div class="amount">
                                    <a  href="cart.php?req=<?php echo 1 ?>&& idinreament=<?php echo $key?>"><i class="fa-solid fa-circle-down fa-rotate-180"></i></a>
                                    <span><?php echo $value["qty"] ?></span>
                                    <a href="cart.php?req=<?php echo 0 ?>&& idinreament=<?php echo $key?>"><i class="fa-solid fa-circle-down"></i></a>
                                </div>
                                <div class="remove_udt_cart"><a href="cart.php?iddel=<?php echo $key ?>"><i class="fa-solid fa-trash"></i></a></div>
                                <div class="amount_total"><?php echo $value["qty"]*$value['price']?></div>
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
    <?php
        $arr_checkout_list= $_POST['checkout_list'];
        if(isset($_POST['checkout']) ):
            if (isset($arr_checkout_list)) {
                # code...  
                print_r($arr_checkout_list); 
            }else{
                echo "aarray not isset";
            }
        endif;
    ?>
</body>
</html>