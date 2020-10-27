const foreground = document.getElementById("main");
const addTaskBtn = document.getElementById("addTask");

//add an editable text-box when Add Task button is clicked
addTaskBtn.addEventListener("click", function(e){
    foreground.appendChild(addTaskBox());
});

function addTaskBox(e){
    var newTaskBox = backlog.createElement('textarea');
    textarea.type = "text";
    textarea.rows="14";

    foreground.innerHTML += "Hello";
    
    return textarea;
}
