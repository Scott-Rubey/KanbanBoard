<?php include('config.php');                                                     //Array of user's projects

$q = pg_query('SELECT projectid, projectname, modified FROM project WHERE userid ='.$_SESSION['userid']);
$res2 = pg_fetch_all($q);

if($res2) {
    $count = count($res2);

    for($i = 0; $i < $count; $i++) {
        $add = pg_fetch_result($q, $i, 'projectid');

        $q2 = pg_query("SELECT userid FROM collaborators WHERE projectid = ".$res2[$i]['projectid']);       //Get all userid of collaborators for projectid
        $uid = pg_fetch_all($q2);                           //Array of userid of collaborators for specific project
        if($uid) {
            $collabs = ""; 
            $c2 = count($uid);
            for($x = 0; $x < count($uid); $x++) {           //Loop through userid to get alias 
                $q3 = pg_query("SELECT alias FROM person WHERE userid = ".$uid[$x]['userid']);
                $name = pg_fetch_result($q3, 0, 'alias');
                if($collabs == "") {
                    $collabs .= $name;
                } else {
                    $collabs .= ", " . $name; 
                }
            }
            $res2[$i]['collaborators'] = $collabs; 
        }
    }
}

if($res2) {
    echo json_encode($res2);
}


?>
