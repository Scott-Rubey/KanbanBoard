<?php include('./config.php');

$persons = pg_query("SELECT * FROM person"); 
$result = pg_query("SELECT email FROM person WHERE email = ". "'".$_POST['email']."'");

if(pg_num_rows($result) == 1) {       //User located in database via email 
  echo "fuck ya";
} else {
  $params = array(                          //Assoc array with table values for 'person' to add new user to database
      "userid"=>pg_num_rows($persons)+1,      //UserID assigned based on how many rows are currently in person table
      "name"=>$_POST['name'],
      "email"=>$_POST['email'],
      "imageurl"=>$_POST['imageurl']
  );  
  $insert = pg_insert($conn, 'person', $params);      //Insert user into database 
  if(!$insert) {                                      //Insert error
      echo "Login unsuccessful"; 
  }
}



?>