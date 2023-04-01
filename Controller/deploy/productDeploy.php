<?php
function productDeploy()
{
  include('/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/Model/database/connect.php');
  $sqlQuery = "SELECT productID,pro_title,qty,category.typeof,price,pro_des,image FROM `PRODUCT`,`CATEGORY` 
              WHERE product.categoryID = category.categoryID";
  $res = $conn->query($sqlQuery);
 ?>

<div class="wrapper">
  <button class="add" onclick="addProduct()">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </svg>
  </button>
</div>
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
          while ($row = mysqli_fetch_array($res)) {
          ?>
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
    <?php }
    } ?>
  </tbody>
</table>
