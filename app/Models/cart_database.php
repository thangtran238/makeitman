<?php
require "database.php";
if($conn):
    echo "hi thi you are successful! <br>";
endif;
$result=$conn->query("SELECT COUNT(accountID) FROM cart;");
$row = $result->fetch_row();
var_dump($row);
?>