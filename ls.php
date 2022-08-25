<?php

$id = $_GET['id'];
exec("ls /$id", $items, $return_status);

foreach ($items as $key => $item) {
  printf("%s<br>", $item);
}

?>
