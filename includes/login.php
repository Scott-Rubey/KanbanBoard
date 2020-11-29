<?php include('./config.php');

$q = pg_query($conn, "SELECT userid FROM person WHERE email = ". "'".$_POST['email']."'");
$result = pg_fetch_result($q, 'userid');

if($result == "") {                       //User not located in database via email 

  $params = array(                                    //Assoc array with table values for 'person' to add new user to database
      "userid"=>"",                              //UserID assigned based on how many rows are currently in person table
      "alias"=>$_POST['alias'],
      "email"=>strtolower($_POST['email']),
      "imageurl"=>$_POST['imageurl']
  );  

  $insert = pg_insert($conn, 'person', $params);      //Insert user into database 

  if(!$insert) {                                      //Insert error
      http_response_code(404);                        //Send error code back to ajax to handle error
      die("Login unsuccessful"); 
  }

  $q = pg_query($conn, "SELECT userid FROM person WHERE email = ". "'".$_POST['email']."'");
  $userid = pg_fetch_result($q, 'userid');
  $_SESSION['userid'] = $userid;                        //Set superglobal session variable userid to track user across pages 

} else {

  $userid = $result;
  $_SESSION['userid'] = $userid;        //User already exists 

}

http_response_code(200); 
echo json_encode(array(
    'success'=>true,
    'userid'=>$userid
)); 

?>