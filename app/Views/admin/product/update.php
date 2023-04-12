<!DOCTYPE html>
<html lang="en">

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


<?php
ob_start();
$id = "";
$id = $_GET['id'];

edit($id);
if (isset($_POST['apply'])) {
  apply($id);
  ob_clean();
  header('Location: http://localhost/project/makeitman/public/');
  exit;
}


function getDatabase($id)
{
  include('../app/Models/database.php');
  $sql_query = "SELECT CONCAT('PR', CAST(SUBSTR(productID, 3) AS UNSIGNED)) AS productID, pro_title,qty,category.typeof,price,pro_des,image FROM product,category 
  where product.categoryID = category.categoryID and CONCAT('PR', CAST(SUBSTR(productID, 3) AS UNSIGNED)) = '$id'  ORDER BY CAST(SUBSTR(productID, 3) AS UNSIGNED)";
  $res = $conn->query($sql_query);
  $row = mysqli_fetch_assoc($res);
  $title = $row['pro_title'];
  $qty = $row['qty'];
  $typeof = $row['typeof'];
  $img = $row['image'];
  $price = $row['price'];
  $pro_des = $row['pro_des'];
  $pro_promo = "";
  $array = ['pro_title' => $title, 'qty' => $qty, 'price' => $price, 'pro_des' => $pro_des, 'typeof' => $typeof, 'img' => $img, 'promo' => $pro_promo];
  return $array;
}

function applyDatabase($id, $newProName, $newQty, $newCate, $newPrice, $newProdes, $newImg, $newPromo)
{
  include('../app/Models/database.php');
  $sql_update = "UPDATE `product` SET `pro_title`='$newProName',`qty`='$newQty',
  `categoryID`='$newCate',`promoID`='$newPromo',`price`='$newPrice',`pro_des`='$newProdes',`image`='$newImg' 
  WHERE `productID` = '$id'";
  return $conn->query($sql_update);
}

function edit($id)
{
  $array = getDatabase($id); ?>

  <body>
    <div class="add-product">
      <a href="http://localhost/project/makeitman/public/"> Back</a>
      <form action="" method="post" enctype="multipart/form-data">
        <div class="post-infor">
          <input type="text" name="name" placeholder="Product Name" value="<?php echo $array['pro_title'] ?>" required />
          <input type="number" name="quantity" placeholder="Quantity" value="<?php echo $array['qty'] ?>" required />
          <select name="category" id="">
            <option value="TS">T-shirt</option>
            <option value="PS">Pants</option>
            <option value="SN">Sneakers</option>
            <option value="AC">Accessory</option>
          </select>
          <select name="promo" id=""> <?php
                                      include('./app/Models/database.php');

                                      $sqlQuery = "SELECT promoID FROM promotion";
                                      $res = $conn->query($sqlQuery);
                                      while ($row = mysqli_fetch_array($res)) {
                                      ?>
              <option value="<?php echo $row['promoID']; ?>"> <?php echo $row['promoID']; ?></option>
            <?php }
            ?>
          </select>
          <input type="number" name="price" placeholder="Price" value="<?php echo $array['price']  ?>" required />
          <input type="text" name="description" placeholder="Description" value="<?php echo $array['pro_des']  ?>" required />
        </div>
        <div class="post-image">
          <label for="mypicture" class="preview">
            <span>Upload to review image</span>
          </label>
          <input id="mypicture" type="file" name="image" hidden />
        </div>
        <div class="button-row">
          <button type="submit" class="accept-input" name="apply">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg></button>
        </div>
      </form>
    </div>

  </body>
<?php
}

function apply($id)
{
  $array = getDatabase($id);
  if (
    isset($_POST['name']) || isset($_POST['quantity']) || isset($_POST['category'])
    || isset($_POST['price']) || isset($_POST['description'])

  ) {
    $array['pro_tile'] = $_POST['name'];
    $array['qty'] = $_POST['quantity'];
    $array['price'] = $_POST['price'];
    $array['typeof'] = $_POST['category'];
    $array['pro_des'] = $_POST['description'];
    $array['typeof'] = $_POST['category'];
    $array['promo'] = $_POST['promo'];
    if (isset($_FILES['image'])) {
      $file = $_FILES['image'];
      $filename = $file['name'];
      $path = "./public/img/" . basename($filename);
      move_uploaded_file($file['tmp_name'], $path);
      if ($file['name'] != "") {
        $array['img'] = $file['name'];
      }
    }
    applyDatabase(
      $id,
      $array['pro_tile'],
      $array['qty'],
      $array['typeof'],
      $array['price'],
      $array['pro_des'],
      $array['img'],
      $array['promo']
    );
  }
}

?>

<script>
  var upload = document.querySelector("#mypicture");
  var preview = document.querySelector(".preview");

  upload.addEventListener("change", function(e) {
    let file = upload.files[0];
    if (!file) {
      return;
    }
    let img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });

  let dropBtn = document.querySelector(".close");

  dropBtn.addEventListener("click", closeProductForm);

  function closeProductForm() {
    let divToRemove = document.querySelector(".add-product");
    divToRemove.remove();
  }
</script>

</html>