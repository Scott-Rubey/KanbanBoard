<?php include('./config.php');

$projid = $_POST['projectid'];

if(!isset($projid)) {
    echo json_encode(array('success'=>false, 'message'=>'projectID not provided for delete-project'));
} else {
    pg_query($conn, "DELETE FROM project WHERE projectid = ".$projid);
    echo json_encode(array('success'=>true, 'message'=>'project successfully removed'));
}

?>