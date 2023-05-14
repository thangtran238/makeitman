<?php
require "../database.php";
$result=$conn->query("SELECT COUNT(accountID) FROM cart;");
$row = $result->fetch_row();
function logMess($message){
    echo "<script> console.log('$message');</script>";
}
?>


