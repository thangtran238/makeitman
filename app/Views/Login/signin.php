<?php
include 'connect.php';

?>
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>signin</title>
    <link rel="stylesheet" href="signin1.css">
</head>

<body>
    <div class="main">
        <div class="allconten">
            <div class="contener">
                <div class="div1">
                    <button type="button"  class=" my1" onclick="myk()">Sign In</button>
                    <script>
                        function myk() {
                            location.replace("signin.php");
                        }
                    </script>
                </div>
                <div class="div2">
                <button type="button" class="my" onclick="myFunction()">Sign Up</button>
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
                        <div class="well">
                            <div id="p1"> Welcome to</div>
                            <div  id="p2"> Welcome to</div>
                        </div>
                        <div class="pp"> 
                            <div id="mkey">MAKEIT</div>
                            <div id="men"> Men</div>
                        </div>
                        <div class="mm">
                        <div  id="mkey">MAKEIT</div>
                        <div id=men2>Men</div>
                        </div>   
                    </div>
                    <div class="right-conten">
                        <form action="" method="post">
                            <div class="n1">
                                <div> <label for="" class="uname">Username</label></div>

                                <div><input type="text"  oninvalid="alert('You must fill out the form!');" name="name" id="uname" required><br>                           
                            </div>
                            </div><br>
                            <div class="n2">
                                <div>
                                    <label for="" class="pass">Password</label>
                                </div>
                                <div>
                                    <input type="text" name="pass" id="uname" >
                                </div>
                            </div>
                            <input type="submit" name="sm" id="si" value="Sign In">
                        
                        </form>

                    </div>

                </div>

                    <p id="p1"> You don't have an account yes? <a  class="a1"href="signup.php">Sign up</a></p>
                
            </div>
        </div>
    </div>
</body>
</html>
<?php     
include "connect.php";                  
        if(isset($_POST['sm'])){
           $name=$_POST['name'];
           $pass=$_POST['pass'];
           $sql="SELECT * FROM account where username = '$name' and password = '$pass'";
           $query=mysqli_query($conn,$sql);
           $row=mysqli_fetch_assoc($query);
                if($row['username']=='admin'&& $row['password']=='makeitmen'){
                    header("Location: https://www.youtube.com/");
                }
                else {
                    if($row){
                            header("Location: https://www.bkns.vn/cac-ham-xu-ly-chuoi-trong-php.html");
                        }
                    echo "<script> alert('thất bại') </script>";
                }
                    
        }
       

?>