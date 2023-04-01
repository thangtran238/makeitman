<?php
function userDeploy()
{
  include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/Model/database/connect.php');
  $sqlQuery = "SELECT account.userID, fullname,phone,email,address,role.rolename,username,password FROM `users`,`account`,`role`
                WHERE `account`.`userID` = `users`.`userID` and users.roleID = role.roleID";
  $res = $conn->query($sqlQuery)
 ?>


<table class="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>FULL NAME</th>
      <th>PHONE</th>
      <th>EMAIL</th>
      <th>ADDRESS</th>
      <th>ROLE</th>
      <th>USERNAME</th>
      <th>PASSWORD</th>
      <th>OPTION
      <th>
    </tr>
  </thead>
  <tbody>
    <?php
          while ($row = mysqli_fetch_array($res)) { ?>
      <tr>
        <td><?php echo $row['userID'] ?></td>
        <td><?php echo $row['fullname'] ?></td>
        <td><?php echo $row['phone'] ?></td>
        <td><?php echo $row['email'] ?></td>
        <td><?php echo $row['address'] ?></td>
        <td><?php echo $row['rolename'] ?></td>
        <td><?php echo $row['username'] ?></td>
        <td><?php echo $row['password'] ?></td>
        <td>
          <a href="#">Modify</a>
          <a href="#">Delete</a>
        </td>
      </tr>
    <?php 
  }
  } ?>
  </tbody>
</table>
