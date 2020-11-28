<?php include('./config.php');

$projname = $_POST['newprojectname'];
$collab = json_decode($_POST['collaborators']);
$projid = $_POST['projectid'];

$proj = pg_query($conn, "SELECT * FROM project WHERE userid = ".$_SESSION['userid']." AND projectid ="."'".$projid."'");         //Gets current user's projects
$oldName = pg_fetch_result($proj, 'projectname');                                                                                       //Check for userid and proj to avoid duplicate proj names by different users

if(!isset($projname)) {
    echo json_encode(array(
        "success"=>false, 
        "duplicate"=>false, 
        'projectid'=>$projid, 
        'message'=>'project name was not found'
    )); 
}

if(!isset($projid)) {
    echo json_encode(array(
        "success"=>false, 
        "duplicate"=>false, 
        'projectid'=>$projid, 
        'message'=>'project id was not found'
    )); 
}

if(strcmp($projname, $oldName) == 0) {                                                                   //Project already exists by the supplied name 

    http_response_code(200); 
    echo json_encode(array(
        "success"=>true, 
        "duplicate"=>true
    )); 

} else {

    pg_query($conn, "UPDATE project SET projectname = '".$projname."' WHERE projectid = ". $projid);

    $d = date('Y-m-d');
    pg_query($conn, "UPDATE project SET modified = '".strval($d)."' WHERE projectid = ". $projid);


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