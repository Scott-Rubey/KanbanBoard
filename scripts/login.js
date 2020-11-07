function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile()                 //Gets user's ID, name, email, photo 
    var name = profile.getName()
    var email = profile.getEmail(); 
    var profileImage = profile.getImageUrl() 
    
    $.ajax({
        type: 'POST', 
        url: './includes/login.php', 
        data: {
            name: name,
            email: email, 
            imageurl: profileImage
        }, 
        success: function(data) {
            window.location.href = data
        },
        error: () => {
            alert("Error logging in. Please try again.")
            signOut()
        }
    })
    
}