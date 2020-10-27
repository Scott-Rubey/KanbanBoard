const foreground = document.getElementById("main");
const addTaskBtn = document.getElementById("addTask");

//add an editable text-box when Add Task button is clicked
addTaskBtn.addEventListener("click", function(e){
    foreground.append(addTaskBox());
});

function addTaskBox(e){
    var newTask = document.createElement('textarea');
    newTask.id="newTask";
    newTask.rows=10;
    newTask.cols=30;

    return newTask;
}
