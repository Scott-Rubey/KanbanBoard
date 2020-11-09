<?php include('./config.php');

$q = pg_query($conn, "SELECT userid FROM person WHERE email = ". "'".$_POST['email']."'");
$result = pg_fetch_result($q, 'userid');

if($result == "") {                       //User not located in database via email 

  $params = array(                                    //Assoc array with table values for 'person' to add new user to database
      "userid"=>"",                              //UserID assigned based on how many rows are currently in person table
      "name"=>$_POST['name'],
      "email"=>$_POST['email'],
      "imageurl"=>$_POST['imageurl']
  );  

  $insert = pg_insert($conn, 'person', $params);      //Insert user into database 

  if(!$insert) {                                      //Insert error
      http_response_code(404);                        //Send error code back to ajax to handle error
      die("Login unsuccessful"); 
  }
}

$q = pg_query($conn, "SELECT userid FROM person WHERE email = ". "'".$_POST['email']."'");
$userid = pg_fetch_result($q, 'userid');

http_response_code(200); 
$_SESSION['userid'] = $userid;                        //Set superglobal session variable userid to track user across pages 
echo "http://localhost:5432/projects.html"; 

?>