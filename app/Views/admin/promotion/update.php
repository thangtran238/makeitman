<!DOCTYPE html>
<html lang="en">
<?php 
$id = "";
if (isset($_GET['id'])) {
  $id = $_GET['id'];
}
$array = getDatabase($id);
ob_start();
if(isset($_POST['apply'])) {
  apply($id);
  ob_clean();
  header('Location: http://localhost/project/makeitman/public/');
  exit;
}

?>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin</title>
  <style>
    <?php
    include("../app/Views/admin/assets/style/overall.css");
    include("../app/Views/admin/assets/style/adminpage/modal.css");
    ?>
  </style>
</head>

<body>
  <div class="add-product">
    <a href="http://localhost/project/makeitman/public/"> Back</a>
    <form action="" method="post">
      <div class="post-infor">
        <input type="text" name="name" placeholder="Promote Name" value="<?php echo $array['promo_name'] ?>"/>
        <input type="number" name="discount" placeholder="Discount" value="<?php echo $array['discount'] ?>" />
        <div class="status">
          <p> Status </p>
          <div class="choose-area">
            <label> <span>Valid</span>
              <input type="radio" name="status" placeholder="Discount" value="1"
              />
            </label>
            <label> <span>Invalid</span>
              <input type="radio" name="status" placeholder="Discount" value="0"/>
            </label>
          </div>

        </div>
        <div class="button-row">
          <button type="submit" class="accept-input" name="apply">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></button>
        </div>
    </form>
  </div>
<?php 
  function getDatabase($id)
{
  include('../app/Models/database.php');
  $sql_query = "SELECT CONCAT('PROMO', CAST(SUBSTR(promoID, 6) AS UNSIGNED)) AS promoID, promo_name, discount, status
  FROM promotion where promoID = '$id' ORDER BY CAST(SUBSTR(promoID, 6) AS UNSIGNED) ";
  $res = $conn->query($sql_query);
  $row = mysqli_fetch_assoc($res);
  $title = $row['promo_name'];
  $discount = $row['discount'];
  $status = $row['status'];
  $array = ['promo_name' => $title, 'discount' => $discount, 'status' => $status];
  return $array;
}
function applyDatabase($id, $newProName, $newDis, $newStatus)
{
  include('../app/Models/database.php');
  $sql_update = "UPDATE `promotion` SET `promoID`='$id',`promo_name`='$newProName',`discount`='$newDis',`status`='$newStatus'
  where `promoID` = '$id'";
  return $conn->query($sql_update);
}


function apply($id)
{
  if (
    isset($_POST['name']) || isset($_POST['quantity']) || isset($_POST['category'])
    || isset($_POST['price']) || isset($_POST['description'])

  ) {
    $name = $_POST['name'];
    $discount = $_POST['discount'];
    $status = $_POST['status'];

    }
    applyDatabase(
      $id,
      $name,
      $discount,
      $status,
    );
  }
?>


</body>

</html>