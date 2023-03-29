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
  <style>
    <?php
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/assets/fontawesome-free-6.4.0-web/css/all.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/style/overall.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/style/adminpage/header.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/style/adminpage/body.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/style/adminpage/revenue.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/style/adminpage/table.css");
    ?>
  </style>
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
        <form class="content" action="#" method="post">
          <button type="button" class="section" id="user" name="totalUser">
            <div class="icon">
              <div class="numbers"><?php echo $users = viewAccount() ?></div>
              <div class="title">USERS</div>
            </div>
            <div class="more-info">
              <p>MORE DETAILS</p>
            </div>
          </button>
          <button type="button" class="section" id="item" name="totalProduct">
            <div class="icon">
              <div class="numbers"><?php echo $products = viewProduct() ?></div>
              <div class="title">ITEMS</div>
            </div>
            <div class="more-info">
              <p>MORE DETAILS</p>
            </div>
          </button>
          <button type="button" class="section" id="promo" name="totalPromote">
            <div class="icon">
              <div class="numbers"><?php echo $promo = viewPromotions() ?></div>
              <div class="title">TOKENS</div>
            </div>
            <div class="more-info">
              <p>MORE DETAILS</p>
            </div>
          </button>
        </form>
      <?php 
      $showCase = "abc";
          include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/Controller/supporter/showAdmin.php");
          if (isset($_POST['totalUser']) == "user") {
            $showCase = "user";
          }
          if (isset($_POST['totalProduct']) == "product") {
            $showCase = "product";
          }
          if (isset($_POST['totalPromote']) == "promote") {
            $showCase = "promote";
          }
          showCase($showCase);
      ?>
  </div>
      </section>
      <div class="revenue">
        <i class="fa-solid fa-receipt"></i>
      </div>
      <div class="display-revenue hide">
        <div class="modal-header">
          Revenue
        </div>
        <div class="modal-body">
          Detail Revenue
        </div>
        <div class="modal-footer">
          <button>Close</button>
        </div>
      </div>
    </div>




  <script>
    <?php
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/src/action/actionadmin/admin.js")
    ?>
  </script>





</body>

</html>