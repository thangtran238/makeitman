<?php 
require "../../Models/database.php";
session_start();
if(isset($_POST['submit'])):
    $name=$_POST['username'];
    $pass=$_POST['password'];
    $query = "SELECT accountID,username,password FROM account WHERE username='$name' AND password='$pass';";
    $result = mysqli_query($conn,$query);
    $row = mysqli_fetch_assoc($result);
    print_r($row);
    if ($row) {
        $_SESSION["account"]=[
        "accountID"=>$row['accountID'],
        "username"=>$name,
        "password"=>$pass
        ];
        echo "<script>alert('successfull move to cart'); </script>";
        header('location: ./cart.php');
    }else{
        echo "<script> alert('have no account'); </script>";
    }
endif;
?>
<!DOCTYPE html>
<html>
<head>
	<title>Login Page</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div class="login-page">
		<div class="form">
			<form class="login-form" method="post">
				<input type="text" name="username" placeholder="username" required/>
				<input type="password" name="password" placeholder="password" required/>
				<button type="submit" name="submit">login</button>
				<p class="message">Not registered? <a href="#">Create an account</a></p>
			</form>
		</div>
	</div>
</body>
</html>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #333;
    }

    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .form {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input[type="text"], input[type="password"] {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 3px;
        border: none;
    }

    button {
        background-color: #4CAF50;
        color: #fff;
        padding: 10px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    button:hover {
        background-color: #3e8e41;
    }

    .message {
        margin-top: 15px;
        font-size: 12px;
        text-align: center;
    }

    a {
        color: #4CAF50;
    }

</style>