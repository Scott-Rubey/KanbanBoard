$(document).ready(function() {

    $('#projectform').submit(function(e) {
        e.preventDefault()

        var collab = $('#collaborators').val()
        collab = collab.split(";")
        for(var i = 0; i < collab.length; i++)
            collab[i] = collab[i].trim() 
    
        var formData= {
            'projectname': $('#projectname').val(),
            'collaborators': JSON.stringify(collab)
        }
    
        $.ajax({
            type: 'POST', 
            url: '../includes/new-project.php', 
            data: formData,
        })
        .done(function(data) {
            var data = JSON.parse(data)
            if(data.success) {
                if(data.duplicate == true) {
                    alert("You already have a project by that name.")
                } else {
                    window.location.href = "http://localhost:8000/kanban.html"      //Go back to user's projects page
                }
            }
        })
        .fail(function(data) {
            console.log(data)
        })
    }
    
    )
})