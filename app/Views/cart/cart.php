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
        <div class="container">
            <div class="header">
                <div class="cart_title">
                    <div class="cart_name">
                        <div class="cart_amout">3 | <i class="fa-solid fa-cart-shopping"></i></div>
                        <h3>Shopping Cart</h3>
                    </div>
                </div>
                <div class="cart_user">
                    <div class="user_name"><h4>A Quang Handsome</h4></div>
                    <div class="user_img"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg" alt=""></div>
                    <div class="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></div>
                </div>
            </div>
            <div class="content">
                <div class="frame-product-list">
                    <?php $a = 0;
                    while($a<=33):?>
                    <div class="product_cart">
                        <input type="checkbox" class="styled-checkbox" name="check" id="check">
                        <div class="img"><img src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/431599/item/goods_69_431599.jpg?width=750" alt=""></div>
                        <div class="product_name">
                            <h5>Aos phong naam cos coo made in Trung Quooc</h5>
                        </div>
                        <div class="product_price"><h4>300 $</h4></div>
                        <div class="amount">
                            <i class="fa-solid fa-circle-down fa-rotate-180"></i>
                            <input type="number">
                            <i class="fa-solid fa-circle-down"></i>
                        </div>
                        <div class="remove_udt_cart"><i class="fa fa-pen-to-square"></i><i class="fa-solid fa-trash"></i></div>
                        <div class="amount_total"><h4>300 $</h4></div>
                    </div>
                    <?php $a+=1; 
                    endwhile; ?>
                </div>
            </div>
            <div class="footer">
                <div class="frame-footer-checkout">
                    <div class="amount-pro-checkout">Amount:</div>
                    <div class="total">Total:</div>
                    <div class="checkout">Checkout <i class="fa-solid fa-circle-down"></i></div>
                </div>        
            </div>
        </div>

</body>
</html>