<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>require account</title>
    <!-- icon awsome-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
    crossorigin="anonymous" referrerpolicy="no-referrer" />

 
</head> 
 <style>
    <?php include './requireaccount.css'; ?>
 </style>
<body>
    <div class="khung">
    <div class="than">
        <div class="huy">
        <i style="color:white;" class="fa-solid fa-xmark"></i>
        </div> <br>
        <div class="chu">
            <h2>You have no account!</h2>
        </div>
        <a href="./login.php"><input type="button" name="login" class="login" value="Sign In"></a>
        <input type="button" class="login" value="Sign Up">
    </div>
</div>
</body>
</html>