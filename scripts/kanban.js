  const backlogColumn = document.querySelector('.flex-item.item1');
  const inProgressColumn = document.querySelector('.flex-item.item2');
  const completeColumn = document.querySelector('.flex-item.item3');
  const main = document.getElementById("main");
  const addTaskBtn = document.getElementById("addTask");
  
  //Each time the kanban screen loads, populate all three columns with tasks from DB
  window.onload = function(){
    populateBacklog();
    populateInProgress();
    populateComplete();

    //make columns droppable
    activateColumns();
  }

  //populate the backlog column with records from the database
  function populateBacklog(){
    var backlog = document.getElementById("backlog-column");

    for(var i = 1; i < 15; ++i){
      var taskBox = createTaskBox();
      var taskName = document.createTextNode("Task name: Test task " + i);
      var dueDate = document.createTextNode("Due date: placeholder");
      
      textToTaskBox(taskBox, taskName, dueDate, backlog);
      backlog.appendChild(taskBox);  
    }
  }

  //populate the inProgress column with records from the database
  function populateInProgress(){
    var inProgress = document.getElementById("inProgress-column");

    for(var i = 1; i < 8; ++i){
      var taskBox = createTaskBox();
      var taskName = document.createTextNode("Task name: Test task " + i);
      var dueDate = document.createTextNode("Due date: placeholder");

      textToTaskBox(taskBox, taskName, dueDate, inProgress);
      inProgress.appendChild(taskBox);
    }
  }

  //populate the complete column with records from the database
  function populateComplete(){
    var complete = document.getElementById("complete-column");

    for(var i = 1; i < 3; ++i){
      var taskBox = createTaskBox();
      var taskName = document.createTextNode("Task name: Test task " + i);
      var dueDate = document.createTextNode("Due date: placeholder");

      textToTaskBox(taskBox, taskName, dueDate, complete);
      complete.appendChild(taskBox);
    }
  }

  function createTaskBox(){
    var taskBox = document.createElement("div");

    taskBox.setAttribute("class", "taskBox");
    taskBox.setAttribute("id", "taskBox");
    taskBox.setAttribute("draggable", "true");

    //allow ability to drag/drop task boxes
    taskBox.addEventListener('dragstart', handleDragStart, false);
    taskBox.addEventListener('dragover', handleDragOver, false);

    return taskBox;
  }

  //format database records
  function textToTaskBox(taskBox, taskName, dueDate, column) {
    taskBox.appendChild(taskName);
    taskBox.innerHTML += "<br>";
    taskBox.appendChild(dueDate);
  } 

  //make columns droppable, i.e. able to accept draggable task boxes
  function activateColumns(){
    let columns = [backlogColumn, inProgressColumn, completeColumn];

    columns.forEach(function(column){
      column.addEventListener('dragover', handleDragOver, false);
      column.addEventListener('dragenter', handleDragEnter, false);
      column.addEventListener('dragend', handleDragEnd, false);
      column.addEventListener('drop', handleDrop, false);
    });
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



$('body').on('submit', 'form', function(e) {

  //e.preventDefault()
  var priority = document.getElementById('priorityBtn')

  var formData= {
    'taskname': $('#newTaskBox').val(),
    'taskdescription': $('#description').val(),
    'taskpriority': priority.options[priority.selectedIndex].text, 
    'taskstatus': 'backlog'        //Setting as default status for now, will change if user is allowed to choose status
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