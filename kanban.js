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
    addTaskBox(newTaskForm);
    addPriorityBox(newTaskForm);
    addDescriptionBox(newTaskForm);
    addSubmitButton(newTaskForm);

    return newTaskForm;
}

function addTaskBox(newTaskForm){
    var taskBox = document.createElement("input");
    taskBox.setAttribute("type", "text");
    taskBox.setAttribute("id", "newTaskBox");
    taskBox.setAttribute("placeholder", "Enter task");
    newTaskForm.appendChild(taskBox); 
    newTaskForm.innerHTML += "<br>";

    return newTaskForm;
}

function addPriorityBox(newTaskForm){
    //add drop down box
    var priorityBtn = document.createElement("select");
    priorityBtn.setAttribute("id", "priorityBtn");
    priorityBtn.innerText += "Priority";

    //add drop down items
    var div = document.createElement("div");
    div.setAttribute("class", "dropdownMenu");
    div.setAttribute("aria-labelledby", "dropdownMenuButton");
    newTaskForm.appendChild(div);

    var high = document.createElement("option");
    high.setAttribute("class", "dropdown-item");
    high.innerHTML += "High Priority";
    priorityBtn.appendChild(high);

    var medium = document.createElement("option");
    medium.setAttribute("class", "dropdown-item");
    medium.innerHTML += "Medium Priority";
    priorityBtn.appendChild(medium);

    var low = document.createElement("option");
    low.setAttribute("class", "dropdown-item");
    low.innerHTML += "Low Priority";
    priorityBtn.appendChild(low); 

    newTaskForm.appendChild(priorityBtn);
    newTaskForm.innerHTML += "<br>";

    return newTaskForm;
}

function addDescriptionBox(newTaskForm){
    //create textarea
    var description = document.createElement("textarea");
    description.setAttribute("id", "description");
    description.setAttribute("rows", "4");
    description.setAttribute("placeholder", "Enter details");

    //add to form
    newTaskForm.appendChild(description);
    newTaskForm.innerHTML += "<br>";

    return newTaskForm;
}

function addSubmitButton(newTaskForm){
    //create submit button
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submitBtn");
    submit.setAttribute("value", "Submit");

    //add to form
    newTaskForm.appendChild(submit);
    newTaskForm.innerHTML += "<br>";

    return newTaskForm;
}