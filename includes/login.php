<?php include('./config.php');

$result = pg_query("SELECT email FROM person WHERE email = ". "'".$_POST['email']."'");

if(pg_num_rows($result) == 1) {                       //User located in database via email 

  $userid = pg_query("SELECT userid FROM person WHERE email = ". "'".$_POST['email']."'");

} else {

  $userid = pg_num_rows(pg_query("SELECT * FROM person"))+1;

  $params = array(                                    //Assoc array with table values for 'person' to add new user to database
      "userid"=>$userid,                              //UserID assigned based on how many rows are currently in person table
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

http_response_code(200); 
$_SESSION['userid'] = $userid;                        //Set superglobal session variable userid to track user across pages 
echo "http://localhost:5432/projects.html"; 


// header('Location: http://localhost:5432/new-project.php');

?>