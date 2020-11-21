<?php include('config.php');        

$projid = $_GET['id'];
if($projid) {
    $_SESSION['currentproject'] = $projid;
    $q1 = pg_query($conn, 'SELECT projectname FROM project WHERE projectid = '.$projid); 
}
else {
    $q1 = pg_query($conn, 'SELECT projectname FROM project WHERE projectid = '.$_SESSION['currentproject']); 
}

$projname = pg_fetch_result($q1, 0, 'projectname');             //Project name to populate board navbar

if($projid) {
    $_SESSION['currentproject'] = $projid;
    $q = pg_query($conn, 'SELECT * FROM task WHERE projectid = '.$projid);
}
else {
    $q = pg_query($conn, 'SELECT * FROM task WHERE projectid = '.$_SESSION['currentproject']);
}

$tasks = pg_fetch_all($q);

echo json_encode(array('tasks'=>$tasks, 'projectname'=>$projname)); 
?>