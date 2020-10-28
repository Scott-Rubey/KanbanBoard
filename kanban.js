const foreground = document.getElementById("main");
const addTaskBtn = document.getElementById("addTask");

//add an editable text-box when Add Task button is clicked
addTaskBtn.addEventListener("click", function(e){
    foreground.append(createForm());
});

function createForm(e){
    var newTaskForm = document.createElement('form');
    newTaskForm.id="newTaskForm";

    //add a header to the new form
    newTaskForm.innerHTML += "<h2 id='newTaskFormHeader'>Create New Task</h2>";

    //add form elements
    addTaskLabel(newTaskForm);
    addTaskBox(newTaskForm);

    return newTaskForm;
}

function addTaskLabel(newTaskForm){
    var taskLabel = document.createTextNode("Task:");
    taskLabel.id="taskLabel";
    newTaskForm.appendChild(taskLabel);

    return newTaskForm;
}

function addTaskBox(newTaskForm){
    var taskBox = document.createElement("input");
    taskBox.type="text";
    taskBox.id="newTaskBox";
    newTaskForm.appendChild(taskBox); 

    return newTaskForm;
}