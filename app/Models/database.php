<?php 
$servername = "localhost";
$database = "makeitmen";
$username = "root";
$password = '123123';
$conn = mysqli_connect($servername, $username, $password, $database);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
};
?>