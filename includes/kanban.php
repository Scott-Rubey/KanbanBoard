<?php include('config.php');        

$projid = $_GET['id'];
if(isset($projid)) {
    $_SESSION['currentproject'] = $projid;
    $q1 = pg_query($conn, 'SELECT projectname FROM project WHERE projectid = '.$projid); 
}
else {
    $q1 = pg_query($conn, 'SELECT projectname FROM project WHERE projectid = '.$_SESSION['currentproject']); 
}

$projname = pg_fetch_result($q1, 0, 'projectname');             //Project name to populate board navbar

if(!$projname) 
    $projname = "";

if($projid) {
    $_SESSION['currentproject'] = $projid;
    $q = pg_query($conn, 'SELECT * FROM task WHERE projectid = '.$projid);
}
else {
    $q = pg_query($conn, 'SELECT * FROM task WHERE projectid = '.$_SESSION['currentproject']);
}

$tasks = pg_fetch_all($q);

http_response_code(200); 
echo json_encode(array('tasks'=>$tasks, 'projectname'=>$projname)); 
?>