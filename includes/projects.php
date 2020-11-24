<?php include('config.php');                                                                                //Array of user's projects

$q0 = pg_query($conn, "SELECT projectid FROM collaborators WHERE userid=".$_SESSION['userid']);             //ProjectID array from collab
$res = pg_fetch_all($q0);

$q1 = pg_query('SELECT projectid, projectname, modified FROM project WHERE userid ='.$_SESSION['userid']);   //User's projects
$res2 = pg_fetch_all($q1);

$q3 = pg_query($conn, "SELECT alias FROM person WHERE userid=".$_SESSION['userid']);                        //Get current user's name
$curUserName = pg_fetch_result($q3, 0, 'alias');

if(!$curUserName) 
    $curUserName = "";

if($res) {
    for($i = 0; $i < count($res); $i++) {
        $q2 = pg_query('SELECT projectid, projectname, modified FROM project WHERE projectid ='.$res[$i]['projectid']);
        $res3 = pg_fetch_assoc($q2); 
        array_push($res2, $res3);
    }
}

if($res2) {
    $count = count($res2);

    for($i = 0; $i < $count; $i++) {
        $add = pg_fetch_result($q1, 0, 'projectid');

        $q2 = pg_query("SELECT userid FROM collaborators WHERE projectid = ".$res2[$i]['projectid']);       //Get all userid of collaborators for projectid
        $uid = pg_fetch_all($q2);                           //Array of userid of collaborators for specific project
        if($uid) {
            $collabs = ""; 
            $c2 = count($uid);
            for($x = 0; $x < count($uid); $x++) {           //Loop through userid to get alias 
                $q4 = pg_query("SELECT alias FROM person WHERE userid = ".$uid[$x]['userid']);
                $collabName = pg_fetch_result($q4, 0, 'alias');
                if(strcmp($curUserName, $collabName) == 0) {
                    continue; 
                } else {
                    if($collabName) {
                        if($collabs == "") {
                            $collabs .= $collabName;
                        } else {
                            $collabs .= ", " . $collabName; 
                        }
                    }
                }
            }
            $res2[$i]['collaborators'] = $collabs; 
        }
    }
}

if($res2) {
    http_response_code(200); 
    echo json_encode($res2);
}



?>
