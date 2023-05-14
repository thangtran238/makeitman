<?php 
require "./database.php";
session_start();
// get username account id account;
$user=$_SESSION['account']['username'];
$accountID=$_SESSION['account']['accountID'];
// _____________    DELETE PRODUCT________________________________

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
        $qty = $qty <2 ? 1 : --$qty;
    
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
// ______________________________________________________________________________________




// ___________________________ select product to show on shopping cart___________________________
$query="SELECT product.productID, product.pro_title, product.img, product.price, 
       product.pro_des, cart.qty, 
       product.categoryID, product.promoID 
FROM product
JOIN cart ON product.productID = cart.productID
WHERE cart.accountID = '$accountID';";
$result=$conn->query($query);
$rowCount = mysqli_num_rows($result);
$data = array();
while ($row = mysqli_fetch_assoc($result)){
    $data[]=$row; 
}
//_______________ insert data into session SHOPPING_CART-------------------
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
    <form class="container" action='' method="post">
        <div class="header">
            <div class="cart_title">
                <div class="cart_name">
                    <h2> <?php if(isset( $_SESSION['shopping_cart'])) echo $rowCount?></h2>
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

        // ____check user login Or not login ______ 
        if($user): 
            // ______check session shopping_cart  NULL ?_________________
            if(!empty($_SESSION['shopping_cart']) and $_SESSION['shopping_cart'] !=[] and $rowCount):
                foreach ($_SESSION['shopping_cart'] as $key => $value):

                    // __________ SHOW PRODUCTS OUT ____________________
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
                                <div class="amount_total"><?php echo $value["qty"]*$value['price'];  $total=0;$total+= $value["qty"]*$value['price'];?></div>
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

                // if session has no data show this!____________
                echo" <h1> Empty product!</h1>";
            endif;
        else:
            // if user not login show this.
            include "./requireaccount.php";
        endif;
        ?>
    </form>

</body>
</html>
<?php
$arr_checkout_list= $_POST['checkout_list'];
if(isset($_POST['checkout']) ):
    if(isset($arr_checkout_list) and count($arr_checkout_list)>0):
        $_SESSION["checkout_list"]= $arr_checkout_list;
        echo '<script> window.location.href = "../Payment/payment.php";</script>';
    else:
        echo "<script> alert('no product selected')</script>";
    endif;
endif;
?>