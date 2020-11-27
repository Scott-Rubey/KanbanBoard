<?php include('./config.php');

$taskid = $_POST['taskid'];

if(!isset($taskid)) {
    echo json_encode(array('success'=>false, 'message'=>'taskID not provided for delete-task'));
} else {
    pg_query($conn, "DELETE FROM task WHERE taskid = ".$taskid);
    echo json_encode(array('success'=>true, 'message'=>'task was successfully deleted'));
}

?>