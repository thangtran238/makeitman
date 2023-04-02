<?php
include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Controllers/AdminController.php");
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
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/assets/style/adminpage/header.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/assets/style/adminpage/body.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/assets/style/adminpage/revenue.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/assets/style/adminpage/table.css");
    include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/assets/style/adminpage/modal.css");

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
          <button type="submit" class="section" id="user" name="show" value="user">
            <div class="icon">
              <div class="numbers"><?php echo $users = viewAccount() ?></div>
              <div class="title">USERS</div>
            </div>
            <div class="more-info">
              <p>MORE DETAILS</p>
            </div>
          </button>
          <button type="submit" class="section" id="item" name="show" value="item">
            <div class="icon">
              <div class="numbers"><?php echo $products = viewProduct() ?></div>
              <div class="title">ITEMS</div>
            </div>
            <div class="more-info">
              <p>MORE DETAILS</p>
            </div>
          </button>
          <button type="submit" class="section" id="promo" name="show" value="promo">
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
        
        $choice = "";
        if(isset($_POST['show'])) {
          $choice = $_POST['show'];
        }
        switch ($choice) {
          case 'user':
            $choice = 'user';
            userDeploy();
            break;
          case 'item':
            $choice = 'item';
            productDeploy();
            break;
          case 'promo':
            $choice = 'promo';
            promoDeploy();
            break;
        }
      ?>
  </div>
      </section>
      <div class="revenue">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C46.3 0 32 14.3 32 32V96c0 17.7 14.3 32 32 32h80v32H87c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1C.4 368.8 0 373.6 0 378.4V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V378.4c0-4.8-.4-9.6-1.1-14.4L488.2 214.4C483.5 183.1 456.6 160 425 160H208V128h80c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H64zM96 48H256c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm48-168a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm120-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM160 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM328 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM256 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM424 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM352 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48z"/></svg>
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

    



</body>
  <script>
          <?php
          include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/assets/js/activeBtn.js");
          include("/Schooling/IT/Enviroment/xampp/htdocs/project/makeitman/app/Views/admin/assets/js/appendAddForm.js");
          ?>
  </script>

</html>