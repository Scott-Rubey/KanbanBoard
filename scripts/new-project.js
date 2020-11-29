$(window).on('load', function() {

    $('#projectform').on('submit', function(e) {
        e.preventDefault()

        var uid = window.location.search.slice(1, window.location.search.length).split('=')[1]

        var collab = $('#collaborators').val()
        if(collab) {
            collab = collab.split(";")
            for(var i = 0; i < collab.length; i++)
                collab[i] = collab[i].trim() 
        }
    
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
            console.log(data)
            var data = JSON.parse(data)
            if(data.success) {
                if(data.duplicate == true) {
                    alert("You already have a project by that name.")
                } else {
                    window.location.href = "/kanban.html?id=" + data.projectid + "&uid=" + uid     //Go back to user's projects page
                }
            }
        })
        .fail(function(data) {
            console.log(data)
        })
    }
    
    )
})