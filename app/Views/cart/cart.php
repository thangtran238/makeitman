<?php 
// require '../../Models/cart_database.php';
session_start();
error_reporting(0);
$total=0;
// to get amount of the product..
if(isset($_SESSION["cart"])):
    $sl = count($_SESSION["cart"]);
endif;
// delete function______________________
$del = $_GET['del'];
if(!empty($del)):
    unset($_SESSION['cart'][$del]);
    header("location:cart.php");
endif;
// incre and minus a product ____________________
$incre =$_GET['incre'];
$idProC = $_GET['idProC'];
if(isset($idProC)):
    if($incre):
        $_SESSION['cart'][$idProC]['amount']+=1;
        header("location: ./cart.php");
    else:
        $_SESSION['cart'][$idProC]['amount']-=1;
        if(($_SESSION['cart'][$idProC]['amount'])<1):
            $_SESSION['cart'][$idProC]['amount']=1;
        endif;
    endif;
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
                        <h2><?php echo $sl ?></h2>
                        <h3>Shopping Cart</h3>
                        <a href="modun.php"><i class="fa fa-cart-plus"></i></a>
                    </div>
                </div>
                <div class="cart_user">
                    <div class="user_name"><h4>A Quang Handsome</h4></div>
                    <div class="user_img"><img src="https://wiki.matbao.net/wp-content/uploads/2019/07/linux-la-gi-tong-hop-moi-kien-thuc-ve-he-dieu-hanh-linux.jpg" alt=""></div>
                    <div class="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></div>
                </div>
            </div>
            <div class="content">
                <!-- ddoanj nayf caan chinh laij_________________________________________________________________ -->
                <div class="frame-product-list">
                    <?php 
                    if(isset($_SESSION['cart']) and $sl>0):
                    foreach($_SESSION["cart"] as $k =>$v):?>
                    <div class="product_cart">
                        <input type="checkbox" name="checkout_list[]" value="<?php echo $k;?>" id="check">
                        <div class="img"><img src="<?php echo $v["img"]?>" alt=""></div>
                        <div class="product_name">
                            <h5><?php echo $v["pro_title"]?></h5>
                        </div>
                        <div class="product_price"><h4><?php echo $v["price"]?>$</h4></div>
                        <div class="amount">
                            <a  href="cart.php?idProC=<?php echo $k ?>&&incre=1"><i class="fa-solid fa-circle-down fa-rotate-180"></i></a>
                            <span><?php echo $v['amount']?></span>
                            <a href="cart.php?idProC=<?php echo $k ?>&&incre=0"><i class="fa-solid fa-circle-down"></i></a>
                        </div>
                        <div class="remove_udt_cart"><a href="cart.php?del=<?php echo $k;?>"><i class="fa-solid fa-trash"></i></a></div>
                        <div class="amount_total"><h4><?php echo $v['amount']*$v['price']?> $</h4></div>
                    </div>
                    <?php 
                    $total += $v['amount']*$v['price'];
                    endforeach;
                    else:
                        echo "<h3 style='color:red;'> empty product </h3>";
                    endif;
                    ?>
                <!-- footer cana chinh lai ________________________________________________________________________________ -->
                </div>
            </div>
            <div class="footer">
                <div class="frame-footer-checkout">
                    <a href="checkout.php" class="checkout">
                     Checkout <i class="fa-solid fa-circle-down"></i>
                    </a> 
                    <input type="submit" name="checkout" class="checkout" value="checkout"> 
                </div>        
            </div>
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