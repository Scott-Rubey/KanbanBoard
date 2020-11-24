const backlogColumn = document.querySelector('.item1');
const inProgressColumn = document.querySelector('.item2');
const completeColumn = document.querySelector('.item3');
const main = document.getElementById("main");
const addTaskBtn = document.getElementById("addTask");

//Each time the kanban screen loads, populate all three columns with tasks from DB
window.onload = function(){
  populateTasks()

  //make columns droppable
  activateColumns([backlogColumn, inProgressColumn, completeColumn]);
}

function createTaskBox(index){
  var taskBox = document.createElement("div");

  taskBox.setAttribute("class", "taskBox");
  taskBox.setAttribute("id", "taskBox-"+index);
  taskBox.setAttribute("draggable", "true");

  //allow ability to drag/drop task boxes
  taskBox.addEventListener('dragstart', handleDragStart, false);
  taskBox.addEventListener('dragover', handleDragOver, false);

  //allow user to double click on the taskbox to expand it
  taskBox.addEventListener('dblclick', expandTask, false)

  return taskBox;
}

//format database records
function textToTaskBox(taskBox, taskName, dueDate, column) {
  taskBox.appendChild(taskName);
  taskBox.innerHTML += "<br>";
  taskBox.appendChild(dueDate);
} 

//make columns droppable, i.e. able to accept draggable task boxes
function activateColumns(columns){
  columns.forEach(function(column){
    column.addEventListener('dragover', handleDragOver, false);
    column.addEventListener('dragenter', handleDragEnter, false);
    column.addEventListener('dragend', handleDragEnd, false);
    column.addEventListener('drop', handleDrop, false);
  });
}

//used to make sure user cannot open more than one expanded task box at a time
exTaskCount = 0;

//create larger taskbox on double click so user can view all fields
function expandTask(e){
  var taskId = e.target.id;
  var split = taskId.split('-');
  var i = split[1];

  var urlString = window.location.search
  var id = urlString.slice(1, urlString.length).split('=')
  
  $.ajax({
    type: 'GET', 
    data: {'id': id[1]},
    url: '../includes/kanban.php', 
  })
  .done(function(data) {

    if(data != 'false') {
        var parsed = JSON.parse(data);
        var result = parsed.tasks;

        //capture fields from associated row in DB
        var taskName = result[i].taskname;
        var priority = result[i].taskpriority;
        var dueDate = result[i].enddate;
        var description = result[i].taskdescription;

        var taskText = document.createTextNode("Task: " + taskName);
        var priorityText = document.createTextNode("Priority: " + priority);
        var dueDateText = document.createTextNode("Due date: " + dueDate);
        var descText = document.createTextNode("Description: " + description);

        //create the modal that will house all of the task info
        var expandedTask = document.createElement('div');
        expandedTask.setAttribute('class', 'expandedTask');

        //create close button at top of modal
        var closeBtn = createCloseBtn();
        expandedTask.appendChild(closeBtn);

        //create a container for all task info to reside in
        var container = document.createElement('div');
        container.setAttribute('id', 'container');

        //insert all task info into container for formattin
        container = insertTaskInfo(container, taskText, priorityText, dueDateText, descText);

        //append the container with all task info to the modal
        expandedTask.appendChild(container);

        //add expanded task modal to the DOM
        if(exTaskCount === 0){
          main.appendChild(expandedTask)
          exTaskCount = 1;
        }

        //make it draggable
        drag(expandedTask);

        e.stopPropagation(); 
    }
  })
  .fail(function(data) {
    console.log('Could not load task');
  })  
}

//create close button for expanded task form
function createCloseBtn() {
  var close = document.createElement("input");

  close.setAttribute("type", "button");
  close.setAttribute("id", "closeBtn");
  close.setAttribute("value", "x");
  close.setAttribute("onClick", "window.location.href='kanban.html'");

  return close;
}

//insert all task info into container for formatting
function insertTaskInfo(container, taskText, priorityText, dueDateText, descText){
  container.innerHTML += "<br><br>";
  container.appendChild(taskText);
  container.innerHTML += "<br><br>";
  container.appendChild(priorityText);
  container.innerHTML += "<br><br>";
  container.appendChild(dueDateText);
  container.innerHTML += "<br><br>";
  container.appendChild(descText);

  return container;
}

var right = false;

//set up the data transfer object
function handleDragStart(e){
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e){
  if(e.preventDefault)
    e.preventDefault();

  return false;
}

//add colored borders to appropriate column when dragging task box
function handleDragEnter(e){
  //if moving element from backlog to inprogress, add blue border
  if(backlogColumn.contains(dragSrcEl) && inProgressColumn.contains(this)){
    inProgressColumn.classList.add('goRight');
    right = true;
  }
  //if moving element from inprogress to complete, add blue border
  else if(inProgressColumn.contains(dragSrcEl) && completeColumn.contains(this)){
    completeColumn.classList.add('goRight');
    right = true;
  }
  //if moving element from inprogress to backlog, add red border
  else if(inProgressColumn.contains(dragSrcEl) && backlogColumn.contains(this)){
    backlogColumn.classList.add('goLeft');
    right = false;
  }
  //if moving element from complete to inProgress, add red border
  else if(completeColumn.contains(dragSrcEl) && inProgressColumn.contains(this)){
    inProgressColumn.classList.add('goLeft');
    right = false;
  }  
}

//remove colored borders once drag event finished
function handleDragEnd(e){
  //if task was moved from backlog to inprogress, remove blue border
  if(inProgressColumn.contains(dragSrcEl) && right === true)
    inProgressColumn.classList.remove('goRight');

  //if task was moved from inprogress to complete, remove blue border
  else if(completeColumn.contains(dragSrcEl))
    completeColumn.classList.remove('goRight');

  //if task was moved from inprogress to backlog, remove red border
  else if(backlogColumn.contains(dragSrcEl))
    backlogColumn.classList.remove('goLeft');

  //if task was moved from complete to inprogress, remove red border
  else if(inProgressColumn.contains(dragSrcEl) && right === false)
    inProgressColumn.classList.remove('goLeft');  
} 

//drops the task box in the appropriate column
function handleDrop(e){
  e.stopPropagation();

  //user may move backlog items to inprogress
  if(backlogColumn.contains(dragSrcEl) && inProgressColumn.contains(this))
    inProgressColumn.appendChild(dragSrcEl);

  //user may move inProgress items to Complete
  else if(inProgressColumn.contains(dragSrcEl) && completeColumn.contains(this))
    completeColumn.appendChild(dragSrcEl);

  //user may move items backwards from inProgress to Backlog
  else if(inProgressColumn.contains(dragSrcEl) && backlogColumn.contains(this))
    backlogColumn.appendChild(dragSrcEl);

  //user may move items backwards from complete to inProgress
  else if(completeColumn.contains(dragSrcEl) && inProgressColumn.contains(this))
    inProgressColumn.appendChild(dragSrcEl);

  //user may not move tasks by more than one column at a time
  else if((completeColumn.contains(dragSrcEl) && backlogColumn.contains(this)) ||
          (backlogColumn.contains(dragSrcEl) && completeColumn.contains(this))){
    alert("You may only move tasks by one column at a time");

    //remove any colored borders after alert
    inProgressColumn.classList.remove('goRight');
    inProgressColumn.classList.remove('goLeft');
  }

  return false;
}

//ensures there's no more than one 'add task' form on the screen at once
var count = 0;

//add an editable text-box when Add Task button is clicked
addTaskBtn.addEventListener("click", function(e){
  if(count === 0)
    main.appendChild(createForm());
});

//create new task form when 'add task' button pressed
function createForm(e){
    var newTaskForm = document.createElement("form");
    newTaskForm.setAttribute("id", "newTaskForm");
    newTaskForm.setAttribute("class", "popup");

    //add a header to the new form
    newTaskForm.innerHTML += "<h2 id='newTaskFormHeader'>Create New Task</h2>";

    //add form elements
    addTaskBox(newTaskForm);
    addPriorityBox(newTaskForm);
    addDueDate(newTaskForm);
    addDescriptionBox(newTaskForm);
    addButtons(newTaskForm);

    //make form draggable
    drag(newTaskForm);

    count = 1;

    return newTaskForm;
}

//add the box in which we can enter the name of the task
function addTaskBox(newTaskForm){
    var taskBox = document.createElement("input");
    taskBox.setAttribute("type", "text");
    taskBox.setAttribute("id", "newTaskBox");
    taskBox.setAttribute("placeholder", "Enter task");
    taskBox.setAttribute("required", true);
    taskBox.setAttribute("class", "newTaskInput");
    newTaskForm.appendChild(taskBox); 
    newTaskForm.innerHTML += "<br>";

    return newTaskForm;
}

//enter high, medium or low priority
function addPriorityBox(newTaskForm){
    //add drop down box
    var priorityBtn = document.createElement("select");
    priorityBtn.setAttribute("id", "priorityBtn");
    priorityBtn.innerText += "Priority";

    //add drop down items
    var div = document.createElement("div");
    div.setAttribute("class", "newTaskInput");
    div.setAttribute("aria-labelledby", "dropdownMenuButton");
    newTaskForm.appendChild(div);

    var high = document.createElement("option");
    high.setAttribute("class", "dropdown-item");
    high.setAttribute("value", "high");
    high.innerHTML += "High Priority";
    priorityBtn.appendChild(high);

    var medium = document.createElement("option");
    medium.setAttribute("value", "medium");
    medium.setAttribute("class", "dropdown-item");
    medium.innerHTML += "Medium Priority";
    priorityBtn.appendChild(medium);

    var low = document.createElement("option");
    low.setAttribute("value", "low");
    low.setAttribute("class", "dropdown-item");
    low.innerHTML += "Low Priority";
    priorityBtn.appendChild(low); 

    newTaskForm.appendChild(priorityBtn);
    newTaskForm.innerHTML += "<br>";

    return newTaskForm;
}

//field for adding due date
function addDueDate(newTaskForm){
  //create date box
  var dueDateBox = document.createElement("input");
  dueDateBox.setAttribute("id", "dueDateBox");
  dueDateBox.setAttribute("type", "date");

  //add to form
  newTaskForm.appendChild(dueDateBox);

  return newTaskForm;
}

//textarea for adding a full description of the new task
function addDescriptionBox(newTaskForm){
    //create textarea
    var description = document.createElement("textarea");
    description.setAttribute("id", "description");
    description.setAttribute("rows", "4");
    description.setAttribute("placeholder", "Enter details");
    description.setAttribute("class", "newTaskInput");

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
    reset.setAttribute("onClick", "window.location.href='kanban.html'");

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

  //otherwise, you can drag from anywhere on the form
  form.onmousedown = dragMouseDown;  

  function prevent(event){
    event.preventDefault();
  }

  function dragMouseDown(event) {
    event = event || window.event;

    // get the mouse cursor position at startup
    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = closeDragElement;

    // call function whenever the cursor moves
    document.onmousemove = elementDrag;    
  }

  function elementDrag(event) {
    event = event || window.event;
    event.preventDefault();

    // calculate the new cursor position
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;

    // set the element's new position
    form.style.top = (form.offsetTop - pos2) + "px";
    form.style.left = (form.offsetLeft - pos1) + "px";  
  }

  function closeDragElement() {
    //stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function populateTasks() {

  var urlString = window.location.search
  var id = urlString.slice(1, urlString.length).split('=')
  

  $.ajax({
      type: 'GET', 
      data: {'id': id[1]},
      url: '../includes/kanban.php', 
  })
  .done(function(data) {

      if(data != 'false') {
          var parsed = JSON.parse(data)
          var result = parsed.tasks
          var projectName = parsed.projectname

          document.getElementById('projectName').innerHTML = projectName

          var backlog = document.getElementById("backlog-column");
          var inProgress = document.getElementById("inProgress-column");
          var complete = document.getElementById("complete-column");

          for(var i = 0; i < result.length; i++){
            var taskBox = createTaskBox(i);
            var taskName = document.createTextNode("Task name: " + result[i].taskname);
            var dueDate = document.createTextNode("Due date: " + result[i].enddate);
            var description = document.createTextNode("Description: " + result[i].description);

            if(result[i].taskstatus == 'backlog') {
              textToTaskBox(taskBox, taskName, dueDate, backlog, description);
              backlog.appendChild(taskBox)  
            }
            else if (result[i].taskstatus == 'inProgress') {
              textToTaskBox(taskBox, taskName, dueDate, inProgress, description);
              inProgress.appendChild(taskBox)  
            }
            else {
              textToTaskBox(taskBox, taskName, dueDate, complete, description);
            }
          }
          //console.log(data)
      }
  })
  .fail(function(data) {
      console.log('Projects could not be retrieved')
  })
}

$('body').on('submit', 'form', function(e) {

//e.preventDefault()
var priority = document.getElementById('priorityBtn')
var taskName = $('#newTaskBox').val()
var taskDescription = $('#description').val()
var endDate = $('#dueDateBox').val()

var formData= {
  'taskname': taskName,
  'taskdescription': taskDescription,
  'taskpriority': priority.options[priority.selectedIndex].text, 
  'taskstatus': 'backlog',        //Setting as default status for now, will change if user is allowed to choose status
  'enddate': endDate
}

$.ajax({
  type: 'POST', 
  url: '../includes/new-task.php', 
  data: formData,
})
.done(function(data) {
    var data = JSON.parse(data)
    if(data.success) {
        if(data.duplicate == true) {
            alert("You already have a task by that name.")
        } 
        window.location.reload()      //Reload project to update tasks 
    }
})
.fail(function(data) {
  console.log(data)
})
})

module.exports.populateBacklog = populateBacklog;
module.exports.populateInProgress = populateInProgress;
module.exports.populateComplete = populateComplete;
module.exports.createTaskBox = createTaskBox;
module.exports.textToTaskBox = textToTaskBox;
module.exports.activateColumns = activateColumns;
module.exports.handleDragStart = handleDragStart;
module.exports.handleDragOver = handleDragOver;
module.exports.handleDragEnter = handleDragEnter;
module.exports.handleDragEnd = handleDragEnd;
module.exports.handleDrop = handleDrop;
module.exports.createForm = createForm;
module.exports.addTaskBox = addTaskBox;
module.exports.addPriorityBox = addPriorityBox;
module.exports.addDueDate = addDueDate;
module.exports.addDescriptionBox = addDescriptionBox;
module.exports.addButtons = addButtons;
module.exports.drag = drag;
