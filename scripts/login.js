function onSignIn(googleUser) {
    //var profile = googleUser.getBasicProfile()                 //Gets user's ID, name, email, photo 
    //var name = profile.getName()
    //var profileImage = profile.getImageUrl() 
    var id_token = googleUser.getAuthResponse().id_token        //Unique token used to validate signed in user with server. Google recommends against using emails
    
    $.ajax({
        type: 'POST', 
        url: './includes/login.php', 
        data: {
            p_token: id_token, 
        }, 
        success: function(data) {
            alert("Sign in successful!")
        }
    })
    
}