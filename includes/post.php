<?php include('./config.php');

$first = $_POST['fname'];
$last = $_POST['lname'];

$result = pg_query($conn, "SELECT * FROM names");

$row = pg_fetch_row($result); 

echo $row[0]; 

?>