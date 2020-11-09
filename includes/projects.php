<?php include('config.php');

$q = pg_query('SELECT projectname FROM project WHERE userid ='.$_SESSION['userid']);
$res = pg_fetch_all($q);

echo json_encode($res);

?>
