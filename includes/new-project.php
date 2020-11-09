<?php include('./config.php');

$projname = $_POST['projectname'];
// $collab = $_POST['collaborators']

$proj = pg_query($conn, "SELECT * FROM project WHERE userid = ".$_SESSION['userid']." AND projectname ="."'".$projname."'");         //Gets current user's projects
$res = pg_fetch_result($proj, 'projectname');

if($res != "") {
    $q = pg_query($conn, "SELECT projectid FROM project WHERE projectname = ". "'".$_POST['projectname']."'");
    $_SESSION['currentproject'] = pg_fetch_result($q, 'projectid');             //Set current project id to duplicate
    http_response_code(200); 
    echo json_encode(array("success"=>true, "duplicate"=>true, "redirect"=>"http://localhost:5432/kanban.html")); 
} else {
    $params = array(                                    //Assoc array with table values for 'person' to add new user to database
        "projectid"=>"",
        "userid"=>$_SESSION['userid'], 
        "projectname"=>$projname
    );  
  
    $insert = pg_insert($conn, 'project', $params);      //Insert user into database 
  
    if(!$insert) {                                      //Insert error
        http_response_code(404);                        //Send error code back to ajax to handle error
        echo "not working";
        // die("Login unsuccessful"); 
    }

    $q = pg_query($conn, "SELECT projectid FROM project WHERE projectname = ". "'".$_POST['projectname']."'");
    $_SESSION['currentproject'] = pg_fetch_result($q, 'projectid'); 
    
    http_response_code(200); 
    echo json_encode(array("success"=>true, "duplicate"=>false, "redirect"=>"http://localhost:5432/kanban.html")); 
}



?>