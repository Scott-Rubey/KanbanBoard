function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token        //Unique token used to validate signed in user with server. Google recommends against using emails
    var profile = googleUser.getBasicProfile();                 //Gets user's ID, name, email, photo 
    console.log('ID: ' + profile.getId());                      // Do not send to backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());                // This is null if the 'email' scope is not present.
}