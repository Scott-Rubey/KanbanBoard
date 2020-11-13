<?php include('config.php');

$projects = pg_query('SELECT projectname FROM project WHERE userid ='.$_SESSION['userid']);
$res = pg_fetch_all($projects);

echo json_encode($res);

?>
