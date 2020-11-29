<?php 

include('config.php');                                                                                

/* 
* This file returns the total system stats, irrespective of the user currently logged in. 
* Meant for use in a "fun" stats widget that creates a sense of community amongst users.
*/

$q0 = pg_query($conn, "SELECT GREATEST(COUNT(*)-1,0) as stat_count FROM project ".
" UNION ALL " .
"SELECT GREATEST(COUNT(*) -1,0) as stat_count FROM task");             
$res = pg_fetch_all($q0);

echo json_encode($res);

?>
