<?php 
include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/Controller/supporter/view.php")
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin</title>
  <!-- <link rel="stylesheet" href="../makeitman/src/assets/fontawesome-free-6.3.0-web/css/all.css"> -->
  <style>
    <?php 
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/style/overall.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/style/adminpage/header.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/style/adminpage/body.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/style/adminpage/revenue.css");
    ?>
  </style>
  <link rel="stylesheet" href="/src/style/overall.css">
  <link rel="stylesheet" href="/src/style/admin/header.css">
  <link rel="stylesheet" href="/src/style/admin/body.css">
</head>
<body>
  <div class="root">
      <div class="container">
        <section class="header">
          <div class="logo">
            <h1><span class="sub-color">MAKEIT</span>Men.</h1>
          </div>
          <div class="profile">
            <p>Hello, <span class="sub-color">Admin</span> </p>
          </div>
        </section>
        <section class="body">
          <div class="content">
            <div class="section">
              <div class="icon">
                <div class="numbers"><?php echo $users = viewAccount() ?></div>
                <div class="title">USERS</div>
              </div>
              <div class="more-info">
                MORE DETAILS
              </div>
            </div>
            <div class="section">
              <div class="icon change">
                <div class="numbers change"><?php echo $products = viewProduct() ?></div>
                <div class="title">ITEMS</div>
              </div>
              <div class="more-info change">
                MORE DETAILS
              </div>
            </div>
            <div class="section">
              <div class="icon">
                <div class="numbers"><?php echo $promo = viewPromotions() ?></div>
                <div class="title">COUPONS</div>
              </div>
              <div class="more-info">
                MORE DETAILS
              </div>
            </div>
          </div>
        </section>
        <div class="revenue">
          <p>Revenue</p>
        </div>
        <div class="display-revenue">
          
        </div>
      </div>
  </div>
</body>
</html>