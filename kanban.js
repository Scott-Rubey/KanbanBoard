const main = document.getElementById("main");
const addTaskBtn = document.getElementById("addTask");

//add an editable text-box when Add Task button is clicked
addTaskBtn.addEventListener("click", function(e){
    main.appendChild(createForm());
});

function createForm(e){
    var newTaskForm = document.createElement("form");
    newTaskForm.setAttribute("id", "newTaskForm");
    newTaskForm.setAttribute("class", "popup");

    //add a header to the new form
    newTaskForm.innerHTML += "<h2 id='newTaskFormHeader'>Create New Task</h2>";

    //add form elements
    addTaskBox(newTaskForm);
    addPriorityBox(newTaskForm);
    addDescriptionBox(newTaskForm);
    addButtons(newTaskForm);

    //make form draggable
    drag(newTaskForm);

    return newTaskForm;
}

function addTaskBox(newTaskForm){
    var taskBox = document.createElement("input");
    taskBox.setAttribute("type", "text");
    taskBox.setAttribute("id", "newTaskBox");
    taskBox.setAttribute("placeholder", "Enter task");
    taskBox.setAttribute("required", true);
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

function addButtons(newTaskForm){
    //create submit button
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submitBtn");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("class", "button form");

    //create reset button
    var reset = document.createElement("input");
    reset.setAttribute("type", "button");
    reset.setAttribute("id", "resetBtn");
    reset.setAttribute("value", "Cancel");
    reset.setAttribute("class", "button form"); 

    //add to form
    newTaskForm.appendChild(reset);
    newTaskForm.appendChild(submit);
    newTaskForm.innerHTML += "<br>";

    return newTaskForm;
}

//credit to https://www.w3schools.com/howto/howto_js_draggable.asp for dragging basics
function drag(form) {
  var input = document.querySelector("input");
  var priority = document.getElementById("priorityBtn");
  var option = document.getElementsByClassName("dropdown-item");

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  //allow user to input task, priority and description without getting stuck in drag mode
  if(input)
    input.onmousedown = prevent;
  else if(priority)
    priority.onmousedown = prevent;
  else if(option)
    option.onmousedown = prevent;
  // otherwise, move the form from anywhere inside the form
  else if(form)
    form.onmousedown = dragMouseDown;

  function prevent(event){
    event.preventDefault();
  }

  //you can drag from anywhere on the form
  form.onmousedown = dragMouseDown;  

  function dragMouseDown(event) {
    event = event || window.event;
    
    // get the mouse cursor position at startup:
    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = closeDragElement;
   
    // call function whenever the cursor moves:
    document.onmousemove = elementDrag;    
  }

  function elementDrag(event) {
    event = event || window.event;
    event.preventDefault();
  
    // calculate the new cursor position:
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;
 
    // set the element's new position:
    form.style.top = (form.offsetTop - pos2) + "px";
    form.style.left = (form.offsetLeft - pos1) + "px";  
  }

  function closeDragElement() {
    //stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
  }
}