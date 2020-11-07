$(document).ready(function() {

    $('#projectform').submit(function(e) {
        e.preventDefault()
    
        var formData= {
            'projectname': $('#projectname').val()
            //'collaborators': $('textarea[name=collaborators').val()
        }
    
        $.ajax({
            type: 'POST', 
            url: '../includes/new-project.php', 
            data: formData,
        })
        .done(function(data) {
            console.log(data)
        })
        .fail(function(data) {
            console.log(data)
        })
    }
    
    )
})