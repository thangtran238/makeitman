<?php
include 'connect.php';
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <style >
        
    </style>
 
    <title>Thêm</title>
</head>
<body>
    <form action="" method="post">
        <label for="">Name</label>
        <input type="text" name="name" id="name"><br>
  
        <label for="">Password</label>
        <input type="text" name="pass" id="pass"> <br>
        <label for="">Email</label>
        <input type="text" name="email" id="email"><br>
        <label for="">Phone</label>
        <input type="text" name="phone" id="phone"><br>
        <label for="">Dist</label>
        <input type="text" name="dist" id="dist"><br>

        <label for="">City</label>
        <input type="text" name="city"><br>
        <input type="submit" name="subm" value="Thêm">
    </form>
    <?php
    if(isset($_POST['subm'])){
        $name=$_POST['name'];
        $pass=$_POST['pass'];
        $email=$_POST['email'];
        $phone=$_POST['phone'];
        $dist=$_POST['dist'];
        $city=$_POST['city'];
        $sql="INSERT INTO account(name,pass,email,phone,dist,city) VALUES('$name','$pass','$email','$phone','$dist','$city')";
        if(mysqli_query($conn,$sql)){
            echo"<script> alert('successfuly')</script>";
        }
    }
    ?>
    
</body>
</html>