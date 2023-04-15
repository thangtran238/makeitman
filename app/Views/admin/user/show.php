<?php
function userDeploy()
{
  include("../app/Models/database.php");
  $sqlQuery = "SELECT CONCAT('US', CAST(SUBSTR(account.userID, 3) AS UNSIGNED)) AS userID, fullname,phone,email,address,role.rolename,username,password,status FROM `users`,`account`,`role` 
                WHERE `account`.`userID` = `users`.`userID` and users.roleID = role.roleID ORDER BY CAST(SUBSTR(account.userID, 3) AS UNSIGNED);";
  $res = $conn->query($sqlQuery);
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
        <th>OPTIONS</th>
      </tr>
    </thead>
    <tbody>
      <?php
      while ($row = mysqli_fetch_array($res)) {
        $checkID = substr($row['userID'],0,2);
        if ($row['status'] == '0' && $checkID == 'US') {
      ?>
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
              <a href="http://localhost/project/makeitman/app/Views/admin/user/update.php?id=<?php echo $row['userID'] ?>">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg>
              </a>
              <a href="http://localhost/project/makeitman/app/Views/admin/user/delete.php?id=<?php echo $row['userID'] ?>">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                </svg>
              </a>
            </td>
          </tr>
          <?php
            }
          }
           ?>
    </tbody>
  </table>
  <?php 
}
  ?>