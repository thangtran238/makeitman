<?php
include 'connect.php';
 ?>
<!DOCTYPE html>
<html lang="en">
    <link rel="stylesheet" href="style.css">
<head>

</head>

<body>
    <div class="main">
        <div class="allconten">
            <div class="contener">
                <div class="div1">
                    <button type="button"  class="my" onclick="myk()">Sign In</button>
                    <script>
                        function myk() {
                            location.replace("sigin.php");
                        }
                    </script>
                </div>
                <div class="div2">
                <button type="button" class="my_su" onclick="myFunction()">Sign Up</button>
                <script>
                    function myFunction() {
                        location.replace("sigup.php");
                    }
                </script>  
                </div>
            </div>
            <div class="conten">
                <div class="wrapp">        
                    <div class="left-conten">     
                        <form action="" method="post">
                            <input type="text" name="name" id="name" placeholder="Name"><br><br>
                            <input type="text" name="pass" id="pass" placeholder="Password"> <br><br>
                            <div class="e_p">
                            <input type="text" name="email" id="email" placeholder="Email">
                            <input type="text" name="phone" id="phone"placeholder="Phone">
                            </div><br>
                            <div class="d_c">
                            <input type="text" name="dist" id="dist"placeholder="Dist">
                            <input type="text" name="city" id="city"placeholder="City">
                            </div><br>
                            <input type="submit" name="subm" id="sm"value="Sign Up">
                        </form> 
                    </div>
                    <div class="right-conten">
                        <div id="p1">Being a member of</div>
                        <div class="pp"> 
                            <div id="mkey">MAKEIT</div>
                            <div id="men">Men to explore</div>
                        </div>
                        <div id="p3"> your own style.</div>
                    </div>
                </div>
                    <p id="p1"> You don't have an account yes? <a  class="a1"href="signup.php">Sign up</a></p>
                </div>
            </div>
        </div>
</body>
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
