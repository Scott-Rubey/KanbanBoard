function goToProjects() { 
    var urlString = window.location.search
    var uid = urlString.slice(1, urlString.length).split('&')[1].split('=')[1]

    window.location.href = "/projects.html?id=" + uid
} 
