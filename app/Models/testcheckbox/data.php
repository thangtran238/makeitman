
<?php 
$url = 'https://63a5720f318b23efa793a65e.mockapi.io/api/Product';
$jsonfile = file_get_contents($url);
$data =json_decode($jsonfile);

echo " <pre>";
print_r($data);
echo "</pre>";
foreach ($data as $obj) {
    $name = $obj->name;
    $avatar = $obj->avatar;
    $price = $obj->price;
    $quantity = $obj->quantity;
    $id_type = $obj->id_type;
    $id = $obj->id;
    $detail = $obj->detail;

    // Sử dụng các giá trị thuộc tính ở đây
    // Ví dụ:
    echo "<h1>$id</h1>";
    echo "<p> Tên: $name </p>  <p> Giá: $price </p> <p> Số lượng: $quantity </p>";
}






?>