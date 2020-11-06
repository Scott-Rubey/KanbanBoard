<?php include('./config.php');

require_once '../vendor/autoload.php';

$id_token = $_POST['p_token'];

$CLIENT_ID = "666932379090-0da4ab3rs9u7jmvn7iu2iv7au4p98ljk.apps.googleusercontent.com";

$client = new Google_Client(['client_id' => $CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend
$payload = $client->verifyIdToken($id_token);       //GoogleAPI takes care of authenticating the user's id_token 

if ($payload) {                         //Authentication response from google containing user info 

  $userid = $payload['sub'];
  
  $result = pg_query("SELECT userid FROM person WHERE userid = ". "'".$userid."'");
  if(pg_num_rows($result) > 0) {
    //User found in database
    //Setup user session variables in superglobal $_SESSION 
  } else {
    $params = array(                    //Assoc array with table values for 'person' to add new user to database
        "userid"=>strval($userid), 
        "name"=>$payload['name'],
        "email"=>$payload['email'],
        "imageurl"=>$payload['picture']
    );  
    $insert = pg_insert($conn, 'person', $params);
    if(!$insert) {
        echo "didn't work"; 
    }
  }

} else {

  echo "no";

}

?>