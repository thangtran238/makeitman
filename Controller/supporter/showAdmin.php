<?php
function showCase($type)
{
  include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/Model/database/connect.php');
  if ($type === 'user') {
    $sqlQuery = "SELECT account.userID, fullname,phone,email,address,role.rolename,username,password FROM `users`,`account`,`role`
                WHERE `account`.`userID` = `users`.`userID` and users.roleID = role.roleID";
  } elseif ($type === 'product') {
    $sqlQuery = "SELECT productID,pro_title,qty,category.typeof,price,pro_des,image FROM `PRODUCT`,`CATEGORY` 
                WHERE product.categoryID = category.categoryID";
  } else {
    $sqlQuery = "SELECT* FROM `promotion`";
  }
  $res = $conn->query($sqlQuery);
  if ($type === 'user') { ?>
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
      <tbody><?php
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
        <?php } ?>
      </tbody>
    </table>
  <?php
  } elseif ($type == "product") { ?>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>PRODUCT NAME</th>
          <th>QUANTITY</th>
          <th>CATEGORY</th>
          <th>PRICE</th>
          <th>DESCRIPTION</th>
          <th>IMAGE</th>
          <th>OPTION
          <th>
        </tr>
      </thead>
      <tbody><?php
              while ($row = mysqli_fetch_array($res)) { ?>
          <tr>
            <td><?php echo $row['productID'] ?></td>
            <td><?php echo $row['pro_title'] ?></td>
            <td><?php echo $row['qty'] ?></td>
            <td><?php echo $row['typeof'] ?></td>
            <td><?php echo number_format($row['price']) . "VND" ?></td>
            <td><?php echo $row['pro_des'] ?></td>
            <td><img src="../View/img/<?php echo $row['image'] ?>"></td>
            <td>
              <a href="#">Modify</a>
              <a href="#">Delete</a>
            </td>
          </tr>
        <?php } ?>
      </tbody>
    </table>
  <?php } else { ?>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>PRODUCT CODE</th>
          <th>DISCOUNT</th>
          <th>STATUS</th>
          <th>OPTION
          <th>
        </tr>
      </thead>
      <tbody><?php
              while ($row = mysqli_fetch_array($res)) { ?>
          <tr>
            <td><?php echo $row['promoID'] ?></td>
            <td><?php echo $row['promo_name'] ?></td>
            <td><?php echo $row['discount'] . "%" ?></td>
            <td><?php if ($row['status'] == "0") {
                  echo "Valid";
                } else {
                  echo "Invalid";
                } ?></td>
            <td>
              <a href="#">Modify</a>
              <a href="#">Delete</a>
            </td>
          </tr>
        <?php } ?>
      </tbody>
    </table>

<?php }
}
?>