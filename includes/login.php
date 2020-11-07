<?php include('./config.php');

$result = pg_query($conn, "SELECT * FROM person WHERE email = ". "'".$_POST['email']."'");

if(pg_num_rows($result) == 1) {                       //User located in database via email 

  $userid = pg_fetch_result($result, 'userid'); 

} else {

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

$userid = pg_query($conn, "SELECT userid FROM person WHERE email = ". "'".$_POST['email']."'");
http_response_code(200); 
$_SESSION['userid'] = $userid;                        //Set superglobal session variable userid to track user across pages 
echo "http://localhost:5432/projects.html"; 

?>