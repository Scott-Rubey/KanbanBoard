$(document).ready(function() {

    $.ajax({
        type: 'GET', 
        url: '../includes/projects.php', 
    })
    .done(function(data) {
        var result = JSON.parse(data)

        for(var i = 0; i < result.length; i++) {

            var tbody = document.getElementById('tprojects')

            var tr = document.createElement('tr')

            var th = document.createElement('th') 
            th.setAttribute('scope', 'row')
            var label = document.createElement('label')
            label.innerHTML = result[i].projectname
            th.appendChild(label)

            var td1 = document.createElement('td')
            td1.innerHTML = "Me, Myself, and I"             //Add collaborators 
            var td2 = document.createElement('td')
            td2.innerHTML = "1/1/2020"                      //Add data modified 
            var td3 = document.createElement('td')

            btn = document.createElement('button')
            btn.classList.add('btn')
            btn.classList.add('btn-light')
            btn.setAttribute('data-toggle', 'modal')
            btn.setAttribute('data-target', '#exampleModal')

            td3.appendChild(btn)

            tr.appendChild(th)
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tbody.appendChild(tr)
        }

    })
    .fail(function(data) {
        console.log('Projects could not be retrieved')
    })
})