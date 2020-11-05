<?php include('./includes/config.php');?>
<!DOCTYPE html>
<html>
<head>
    <title>Landing Page</title>
    <meta name="google-signin-client_id" content="666932379090-0da4ab3rs9u7jmvn7iu2iv7au4p98ljk.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script src="./scripts/login.js"></script>
    <script src="./scripts/logout.js"></script>
    <script   src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
</head>
<body>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
    <a href="#" onclick="signOut();">Sign out</a>

    <!-- Just for practice --> 
    <div class="textbox" style="margin-top: 20px;"> 
        <form id="foo">
            <label for="fname">First name:</label>
            <input type="text" id="fname" name="fname"><br><br>
            <label for="lname">Last name:</label>
            <input type="text" id="lname" name="lname"><br><br>
            <input type="submit" value="Send">
        </form>
    </div>

    <p id="test"></p>
    
</body>
<script> 
    $(function() {
        $('#foo').submit(function(e) {

            e.preventDefault(); 

            var first = $("#fname").val(); 
            var last = $("#lname").val(); 
            
            $.ajax({
                type: 'POST', 
                url: './includes/post.php', 
                data: {fname: first, lname: last}, 
                success: function(data) {
                    var arr = JSON.parse(data)
                    document.getElementById('fname').value = arr[0]
                    document.getElementById('lname').value = arr[1]
                }
            })
            return false 
        })
    })
</script> 
    <!-- Just for practice --> 
</html>