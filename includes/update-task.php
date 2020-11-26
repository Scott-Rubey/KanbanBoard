<?php include('./config.php');

$projectID = $_POST['projectid'];
$taskID = $_POST['taskID'];
$taskStatus = $_POST['taskStatus'];

if(!$projectID) {
    echo json_encode(array('success'=>false, 'message'=>'No valid project id')); 
}

if(!$taskID) {
    echo json_encode(array('success'=>false, 'message'=>'No valid task id')); 
}

if(!$taskStatus) {
    echo json_encode(array('success'=>false, 'message'=>'No valid task status')); 
}

pg_query($conn, "UPDATE task SET taskstatus = '".$taskStatus."' WHERE projectid = ".$projectID." AND taskID = ".$taskID);

http_response_code(200); 
echo json_encode(array('success'=>true, 'message'=>'task status updated')); 

?>