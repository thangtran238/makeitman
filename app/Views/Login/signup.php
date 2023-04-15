<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
include 'connect.php';
error_reporting(0);

if(isset($_POST["subm"])):
    $fname= $_POST["fullname"];
    if(strlen($fname)<=4):
        $error="tên cần 4 ký tự trở lên";
    endif;
endif;


 ?>
 <?php
error_reporting(0);
if(isset($_POST['email'])==true && empty($_POST['email'])==true){
    $e_mail="email không được trống";
}

if(isset($_POST['email'])==true && empty($_POST['email'])==false){
    $email=$_POST['email'];
    if(filter_var($email,FILTER_VALIDATE_EMAIL)==false){
        $e_error= 'email không hợp lệ';
    }else{
    }
}
?>
 <?php
error_reporting(0);
if(isset($_POST['pass'])==true && empty($_POST['pass'])==true){
    $p_pass="mật khẩu không được trống";
}

if(isset($_POST['pass'])==true && empty($_POST['pass'])==false){
    $pass=$_POST['pass'];
    if(strlen($pass)<6){
        $p_error= 'mật khẩu phải dài hơn 6 ký tự';
    }else{
    }
}
?>
<!DOCTYPE html>
<html lang="en">
    <link rel="stylesheet" href="stylesignup.css">
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
                            location.replace("signin.php");
                        }
                    </script>
                </div>
                <div class="div2">
                <button type="button" class="my_su" onclick="myFunction()">Sign Up</button>
                <script>
                    function myFunction() {
                        location.replace("signup.php");
                    }
                </script>  
                </div>
            </div>
            <div class="conten">
                <div class="wrapp">        
                    <div class="left-conten">     
                        <form action="" method="post">
                        <input type="text" name="fullname" id="name" placeholder="Fullname" ><br>
                         <small style="color:red;"><?php echo $error?> </small>
                        <br>
                            <input type="text" name="name" id="name" placeholder="Name"  required><br><br>
                            <div class="d_c">
                            <input type="text" name="pass" id="pass" placeholder="Password"> 
                            <input type="text" name="renter" id="pass" placeholder="Re-Enterpass"> 
                            </div><small style="color:red;"> <?php echo $p_pass?></small><br>
                            <small style="color:red;"> <?php echo $p_error?></small><br>
                            <div class="e_p">
                            <input type="text" name="email" id="email" placeholder="Email">
                            <input type="text" name="phone" id="phone"placeholder="Phone">
                            </div><small style="color:red;"> <?php echo $e_mail?></small><br>
                            <small style="color:red;"> <?php echo $e_error?></small>
                            <div class="d_c">
                            <input type="text" name="street" id="dist"placeholder="Street">
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
                    <p id="p1"> You don't have an account yes? <a  class="a1" href="signin.php">Sign IN</a></p>
                </div>
            </div>
        </div>
</body>
    <?php
    if(isset($_POST['subm'])){
        $fullname=$_POST['fullname'];
        $name=$_POST['name'];
        $pass=$_POST['pass'];
        $renter=$_POST['renter'];
        $email=$_POST['email'];
        $phone=$_POST['phone'];
        $street=$_POST['street'];
        $dist=$_POST['dist'];
        $city=$_POST['city'];
        $address=$street.$dist.$city;
        if($renter!=''&& $name!=''&& $phone!=''&& $pass!=''&& $address!='' && $pass==$renter && strlen($pass)>6){
            $sqlUserID = "SELECT CONCAT('US', CAST(SUBSTR(userID, 3) AS UNSIGNED)) AS userID FROM users ORDER BY CAST(SUBSTR(userID, 3) AS UNSIGNED) DESC LIMIT 1";
                $resUser = $conn->query($sqlUserID);
                $stringIDuser = mysqli_fetch_array($resUser)["userID"];  
                $userID = (int)(substr($stringIDuser,2)) + 1;
                $sqlAccountID = "SELECT CONCAT('US', CAST(SUBSTR(acccountID, 3) AS UNSIGNED)) AS accountID FROM account ORDER BY CAST(SUBSTR(acccountID, 3) AS UNSIGNED) DESC LIMIT 1";
                $resAccount = $conn->query($sqlAccountID);
                $stringIDAccount = mysqli_fetch_array($resAccount)["accountID"];  
                $accountID = (int)(substr($stringIDAccount,2)) + 1;
                $insertUser="INSERT INTO users(userID,fullname,email,phone,address) VALUES('US$userID','$fullname','$email','$phone','$address')";
                $insertAccount="INSERT INTO `account`(`acccountID`, `username`, `password`, `status`, `userID`) VALUES ('ac0$accountID','$name','$pass','0','us0$userID')";
                $userSql = $conn->query($insertUser);
                $accountSql = $conn->query($insertAccount);
                if ($userSql && $accountSql) {
                    echo"<script> alert('thành côngg')</script>";
                }
        }
        else{
            echo '<script>alert("Thất bại")</script>';
        }
        
        
        
    }





?>                                                                                                 
</body>
</html>