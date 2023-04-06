<?php
ob_start();
$id = "";
if (isset($_GET["id"])) {
  $id = $_GET["id"];
}

$array = getDatabase($id);
if (isset($_POST['apply'])) {
  apply($id);
  ob_clean();
  header('Location: http://localhost/project/makeitman/public/');

}
function getDatabase($id)
{
  include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Models/database.php');
  $sql_query = "SELECT CONCAT('US', CAST(SUBSTR(account.userID, 3) AS UNSIGNED)) AS userID, fullname, phone, email, address,username, password, status FROM `users`,`account`,`role` WHERE `account`.`userID` = `users`.`userID` and users.roleID = role.roleID and `account`.`userID` = '$id' ORDER BY CAST(SUBSTR(account.userID, 3) AS UNSIGNED);";
  $res = $conn->query($sql_query);
  $row = mysqli_fetch_array($res);
  $fullname = $row['fullname'];
  $phone = $row['phone'];
  $email = $row['email'];
  $address = $row['address'];
  $username = $row['username'];
  $password = $row['password'];
  $array = [
    'fullname' => $fullname,
    'phone' => $phone,
    'email' => $email,
    'address' => $address,
    'username' => $username,
    'password' => $password,
  ];
  return $array;
}

function apply($id)
{
  if (
    isset($_POST['name']) || isset($_POST['phone']) || isset($_POST['email'])
    || isset($_POST['address']) || isset($_POST['username']) || isset ($_POST['password'])

  ) {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    }
    updateUser($id,$name,$phone,$email,$address);
    updateAccount($id,$username,$password);
  }

function updateUser($id,$newName,$newPhone,$newEmail,$newAddress) {
  include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Models/database.php');
  $sql_update = "UPDATE `users` SET `fullname`='$newName', `phone`='$newPhone', `email`='$newEmail', `address`='$newAddress'
  WHERE userID = '$id'";
  return $conn->query($sql_update);
}
function updateAccount($id,$newUsername,$newPassword) {
  include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Models/database.php');
  $sql_update = "UPDATE `account` SET `username`='$newUsername',`password`='$newPassword'
  where `userID` = '$id'";
  return $conn->query($sql_update);
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin</title>
  <style>
    <?php
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/assets/style/overall.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/assets/style/adminpage/modal.css");
    ?>
  </style>
</head>

<body>
  <div class="add-product">
    <a href="http://localhost/project/makeitman/public/"> Back</a>
    <form action="" method="post">
      <div class="post-infor">
        <input type="text" name="name" placeholder="Full Name" value="<?php echo $array['fullname'] ?>" />
        <input type="text" name="phone" placeholder="Phone" value="<?php echo $array['phone'] ?>" />
        <input type="email" name="email" placeholder="Email" value="<?php echo $array['email'] ?>" />
        <input type="text" name="address" placeholder="Address" value="<?php echo $array['address'] ?>" />
        <input type="text" name="username" placeholder="Username" value="<?php echo $array['username'] ?>" />
        <input type="text" name="password" placeholder="Password" value="<?php echo $array['password'] ?>" />

        <div class="button-row">
          <button type="submit" class="accept-input" name="apply">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg></button>
        </div>
    </form>
  </div>

</body>

</html>