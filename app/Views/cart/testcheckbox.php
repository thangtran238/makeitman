<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
<label for="name">name1</label>
<input type="checkbox" name='name[]' id="name" value="htq1">

<label for="name">name2</label>
<input type="checkbox" name='name[]' id="name" value="htq2">

<label for="name">name3</label>
<input type="checkbox" name='name[]' id="name" value="htq3">

<label for="name">name4</label>
<input type="checkbox" name='name[]' id="name" value="htq4">

<label for="name">name5</label>
<input type="checkbox" name='name[]' id="name" value="htq5">

<input type="submit" name='submit' value="ok">
</form>


<?php
$a = [];
if(isset($_POST["submit"]))
  if(isset($_POST["name"])):
    foreach ($_POST['name'] as $value) {
        array_push($a,$value);
    }
  endif;
  echo "<pre>";
  print_r($a);
  echo "</pre>";
  echo "+++++++++++++++++++++++++++++++++++++++++++++++++++++++";

  print_r( $_POST['name']);
?>


