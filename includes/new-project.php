<?php include('./config.php');

$projname = $_POST['projectname'];
$collab = json_decode($_POST['collaborators']);

if(!isset($projname)) {
    echo json_encode(array(
        "success"=>false, 
        "duplicate"=>false, 
        'message'=>'project name was not provided correctly'
    )); 
}

$proj = pg_query($conn, "SELECT * FROM project WHERE userid = ".$_SESSION['userid']." AND projectname ="."'".$projname."'");         //Gets current user's projects
$res = pg_fetch_result($proj, 'projectname');                                                                                       //Check for userid and proj to avoid duplicate proj names by different users

if($res != "") {        //Project already exists by the supplied name 

    $_SESSION['currentproject'] = pg_fetch_result($proj, 'projectid');             //Set current project id to duplicate
    http_response_code(200); 
    echo json_encode(array(
        "success"=>true, 
        "duplicate"=>true
    )); 

} else {

    $params = array(                                    //Assoc array with table values for 'person' to add new user to database
        "projectid"=>"",
        "userid"=>$_SESSION['userid'], 
        "projectname"=>$projname,
        "modified"=>date("Y-m-d") 
    );  
  
    $insert = pg_insert($conn, 'project', $params);      //Insert user into database 
  
    if(!$insert) {                                      //Insert error
        http_response_code(400);                        //Signal http error
        die("Login unsuccessful"); 
    }

    $q = pg_query($conn, "SELECT projectid FROM project WHERE userid = ".$_SESSION['userid']." AND projectname = ". "'".$_POST['projectname']."'");
    $projid = pg_fetch_result($q, 'projectid'); 
    $_SESSION['currentproject'] = $projid;          //Set current projectid 

    //Check if collaborators were provided
    if(!empty($collab)) {                                                                              
        
        foreach($collab as $c) {                                                                                    //Loop to add collaborators
            $newCollaborator = pg_query($conn, "SELECT * FROM person WHERE email = "."'".$c."'");                    //Check if collaborator is in person table
            $newEmail = pg_fetch_result($newCollaborator, "email");                                                  //Fetch collaborator email 
            if(strcmp($newEmail, $c) == 0) {                                                                        //Collaborator email exists
                $curUser = pg_query($conn, "SELECT email FROM person WHERE userid = ".$_SESSION['userid']);         //Check current user's email against collaborator emails provided
                if(strcmp(pg_fetch_result($curUser, "email"), $c) == 0) {
                    //User tried to add self as collaborator 
                    continue; 
                } else {
                    $test = pg_query($conn, "SELECT userid FROM person WHERE email = "."'".$c."'");                  //Check if collaborator is in person table
                    $newUserId = pg_fetch_result($test, "userid");
                    $duplicateCollab = pg_query($conn, "SELECT * FROM collaborators WHERE projectid = ".$projid." AND userid = ".$newUserId);
                    if(pg_fetch_result($duplicateCollab, "userid") == "") {                                         //Collaborator not already assigned to project, add
                        $params = array(                                    
                            "projectid"=>$projid,
                            "userid"=>$newUserId
                        );  
                        $insert = pg_insert($conn, 'collaborators', $params);                                       //Insert collaborator into database 
                    }
                }
            } else {
                //Email not found in person table 
                
            }
        }
    }
    
    http_response_code(200); 
    echo json_encode(array(
        "success"=>true, 
        "duplicate"=>false, 
        'projectid'=>$projid
    )); 

}
?>