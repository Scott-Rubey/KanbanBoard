function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile()                 //Gets user's ID, name, email, photo 
    var name = profile.getName()
    var email = profile.getEmail(); 
    var profileImage = profile.getImageUrl() 
    
    $.ajax({
        type: 'POST', 
        url: '../includes/login.php', 
        data: {
            alias: name,
            email: email, 
            imageurl: profileImage
        }, 
        success: function(data) {
            if(data) {
                console.log(data)
                var result = JSON.parse(data)
                
                if(result['success']) {
                    //console.log(uid)
                    var uid = result['userid']
                    window.location.href = "/projects.html?id=" + uid            //Go to user's projects page
                } else {
                    console.log("UID could not be retrieved!")
                }

            }
            console.log("Login.php returned nothing")
        },
        error: function(data) {
            console.log(data)
            alert("Error logging in. Please try again.")
            signOut()
        }
    })
    
}

// export functions for unit testing
if (typeof module != "undefined") {
    module.exports.onSignIn = onSignIn;
  }