$(document).ready(function() {

    $.ajax({
        type: 'GET', 
        url: '../includes/projects.php', 
    })
    .done(function(data) {

        if(data) {

            var result = JSON.parse(data)

            //console.log(data)

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
                if(result[i].projectname) 
                    label.innerHTML = result[i].projectname
                else 
                    label.innerHTML = "N/A"
                a.appendChild(label)
                if(result[i].projectid)
                    a.href = 'http://localhost:8000/kanban.html?id=' + result[i].projectid
                else
                    a.href = 'http://localhost:8000/kanban.html'
                th.appendChild(a)

                var td1 = document.createElement('td')
                if(result[i].collaborators)
                    td1.innerHTML = result[i].collaborators                     //Add collaborators 
                else 
                    td1.innerHTML = "None"

                var td2 = document.createElement('td')
                if(result[i].modified) {
                    var date = result[i].modified.split("-")                        //Split to reformat date from psql                  
                    td2.innerHTML = date[1] + '/' + date[2] + '/' + date[0]         //Add data modified 
                } else {
                    td2.innerHTML = "N/A"         //Add data modified 
                }
                var td3 = document.createElement('td')

                btn = document.createElement('button')
                btn.classList.add('btn')
                btn.classList.add('btn-light')
                btn.setAttribute('data-toggle', 'modal')
                btn.setAttribute('data-target', '#exampleModal')
                if(result[i].projectid)
                    btn.setAttribute('id', result[i].projectid)

                td3.appendChild(btn)

                tr.appendChild(th)
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tbody.appendChild(tr)
                
            }

            $('#list-items').on('click', 'button', function(e) {                //Listener for 'settings' modal 

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
                        console.log(data)
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

                //Delete project button for modal on project.html
                $('#deleteProject').on('click', function() {
                    
                    //Pull project ID from modal pop up 
                    var formData = {
                        'projectid': projectId
                    }

                    $.ajax({
                        type: 'POST', 
                        url: '../includes/delete-project.php',
                        data: formData
                    })
                    .done(function(data) {
                        //Parse data to check return status & message
                        if(data) {
                            result = JSON.parse(data)
                        }
                        if(result.success) {
                            alert(result.message)
                            window.location.href = window.location.href
                        }
                        else {
                            alert("contact TJ since he messed everything up")
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

