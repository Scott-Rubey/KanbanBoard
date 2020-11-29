function passProjectID() {
    var uid = window.location.search.slice(1, window.location.search.length).split('=')[1]

    window.location.href = "/new-project.html?uid=" + uid

}