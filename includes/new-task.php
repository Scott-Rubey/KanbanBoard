<?php include('config.php'); 

$taskname = $_POST['taskname'];
$taskdescription = $_POST['taskdescription'];
$taskpriority = $_POST['taskpriority'];
$taskstatus = $_POST['taskstatus'];

$task = pg_query($conn, "SELECT * FROM task WHERE projectid = "."'".$_SESSION['currentproject']."'"." AND taskname="."'".$taskname."'");         //Gets current user's projects
$res = pg_fetch_result($task, 'taskname');

if($res == "") {
    $params = array(                                    //Assoc array with table values for 'person' to add new user to database
        "projectid"=>$_SESSION['currentproject'],
        "taskname"=>$taskname, 
        "taskdescription"=>$taskdescription, 
        "taskpriority"=>$taskpriority,
        "taskstatus"=>$taskstatus,
        "startdate"=>date("Y-m-d"), 
        "enddate"=>"2020-11-09"
    );  
  
    $insert = pg_insert($conn, 'task', $params);      //Insert user into database 
  
    if(!$insert) {                                      //Insert error
        http_response_code(404);                        //Send error code back to ajax to handle error
        echo "not working";
        // die("Login unsuccessful"); 
    }

    http_response_code(200); 
    echo json_encode(array("success"=>true, "duplicate"=>false)); 

} else {            //Duplicate task 
    http_response_code(200); 
    echo json_encode(array("success"=>true, "duplicate"=>true)); 
}

?>