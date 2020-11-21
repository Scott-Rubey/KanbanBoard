$(document).ready(function() {

    $.ajax({
        type: 'GET', 
        url: '../includes/projects.php', 
    })
    .done(function(data) {

        if(data) {

            var result = JSON.parse(data)

            console.log(1)

            if(result.length > 0) {
                document.getElementById('projects-CTA').style.display = 'none'
            }

            for(var i = 0; i < result.length; i++) {

                var tbody = document.getElementById('tprojects')

                var tr = document.createElement('tr')

                var th = document.createElement('th') 
                th.setAttribute('scope', 'row')
                var a = document.createElement('a')
                var label = document.createElement('label')
                label.innerHTML = result[i].projectname
                a.appendChild(label)
                a.href = 'http://localhost:8000/kanban.html?id=' + result[i].projectid
                th.appendChild(a)

                var td1 = document.createElement('td')
                if(result[i].collaborators)
                    td1.innerHTML = result[i].collaborators                     //Add collaborators 
                else 
                    td1.innerHTML = "None"

                var td2 = document.createElement('td')
                var date = result[i].modified.split("-")                        //Split to reformat date from psql                  
                td2.innerHTML = date[1] + '/' + date[2] + '/' + date[0]         //Add data modified 
                var td3 = document.createElement('td')

                btn = document.createElement('button')
                btn.classList.add('btn')
                btn.classList.add('btn-light')
                btn.setAttribute('data-toggle', 'modal')
                btn.setAttribute('data-target', '#exampleModal')
                btn.setAttribute('id', result[i].projectid)

                td3.appendChild(btn)

                tr.appendChild(th)
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tbody.appendChild(tr)
                
            }

            $('#list-items').on('click', 'button', function(e) {

                var projectId = this.id
                
                $('#saveChanges').on('click', function() {
                    var newProjName = $('#newProjectName').val()
                    var newCollab = $('#newCollabs').val()

                    if(newCollab) {
                        newCollab = newCollab.split(";")
                        for(var i = 0; i < newCollab.length; i++)
                            newCollab[i] = newCollab[i].trim() 
                    }
                
                    var formData= {
                        'newprojectname': newProjName,
                        'collaborators': JSON.stringify(newCollab),
                        'projectid': projectId
                    }

                    $.ajax({
                        type: 'POST', 
                        url: '../includes/edit-project.php', 
                        data: formData,
                    })
                    .done(function(data) {
                        //console.log(data)
                        var data = JSON.parse(data)
                        if(data.success) {
                            if(data.duplicate == true) {
                                alert("This project already has that name! Try using a new name.")
                            } else {
                                location.reload()
                            }
                        }
                    })
                    .fail(function(data) {
                        console.log(data)
                    })
                    
                })

            })
        } else {
            document.getElementById('list-header').style.display = 'none'
            document.getElementById('list-items').style.display = 'none'
        }

    })
    .fail(function(data) {
        console.log('Projects could not be retrieved')
    })
})

