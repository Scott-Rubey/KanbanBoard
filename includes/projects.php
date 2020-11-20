<?php include('config.php');

$projects = pg_query('SELECT projectname FROM project WHERE userid ='.$_SESSION['userid']);
$res = pg_fetch_all($projects);                                                             //Array of user's projects

$q = pg_query('SELECT projectid FROM project WHERE userid ='.$_SESSION['userid']);
$collab = array(); 

$count = count($res);

for($i = 0; $i < $count; $i++) {
    $add = pg_fetch_result($q, 0);
    array_push($collab, array($add=> "name"));
}

echo json_encode($collab);

?>
