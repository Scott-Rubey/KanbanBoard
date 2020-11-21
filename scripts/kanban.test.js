/* For the time being, this code may spit out a one-time set of errors based on
 the event listener code that isn't wrapped in a function, which gets called 1x
 in the init code below. 
*/
document.body.innerHTML =
document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span class="flex-item">
<span class="item1" />
<span class="item2" />
<span class="item3" />
</span>
</div>`;
global.window = window;
global.$ = require('jquery');
const kanban = require('./kanban');
const backlogColumn = document.querySelector('.item1');
const inProgressColumn = document.querySelector('.item2');
const completeColumn = document.querySelector('.item3');
const main = document.getElementById("main");
const addTaskBtn = document.getElementById("addTask");


// Start tests here

test('verify populateBacklog() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
</div>`;
    expect(() => kanban.populateBacklog()).not.toThrow();
  });

test('verify populateInProgress() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
    expect(() => kanban.populateInProgress()).not.toThrow();
  });

  test('verify populateComplete() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="complete-column"/>
</div>`;
    expect(() => kanban.populateComplete()).not.toThrow();
  });

  test('verify createTaskBox() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
</div>`;
    expect(() => kanban.createTaskBox()).not.toThrow();
  });

  test('verify textToTaskBox() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="complete-column"/>
</div>`;
    var complete = document.getElementById("complete-column");
    var taskBox = kanban.createTaskBox();
    var taskName = document.createTextNode("Task name: Test task 1");
    var dueDate = document.createTextNode("Due date: placeholder");
    expect(() => kanban.textToTaskBox(taskBox, taskName, dueDate, complete)).not.toThrow();
  });

  test('verify activateColumns() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask"/>
<span id="main"/>
<span class="flex-item">
<span class="item1" />
<span class="item2" />
<span class="item3" />
</span>
</div>`;

    expect(() => kanban.activateColumns([backlogColumn,inProgressColumn,completeColumn])).not.toThrow();
  });

  test('verify handleDragStart() no exceptions', () => {
    document.body.innerHTML =
    `<div>
    <span id="backlog-column"/>
    <button id="addTask"/>
    <span id="main"/>
    </div>`;
    class dt{
      setData(x) {
        return;
      }
    }
    class MockEvent {
      dataTransfer;
      constructor(){
        this.dataTransfer = new dt();
      }
    }

    expect(() => kanban.handleDragStart(new MockEvent())).not.toThrow();
  });

  test('verify handleDragOver() no exceptions', () => {
    document.body.innerHTML =
    `<div>
    <span id="backlog-column"/>
    <button id="addTask"/>
    <span id="main"/>
    </div>`;
    class MockEvent {
      preventDefault;
      constructor(){
        this.preventDefault = false;
      }
      preventDefault(){
        return;
      }
    }

    expect(() => kanban.handleDragOver(new MockEvent())).not.toThrow();
  });

 
  test('verify handleDragEnter() no exceptions', () => {
    document.body.innerHTML =
    `<div>
    <span id="backlog-column"/>
    <button id="addTask"/>
    <span id="main"/>
    <div class="flex-item">
<div class="item1" />
<div class="item2" />
<div class="item3" />
<div id="node" />
</div>
    </div>`;
    class MockEvent {
      // nothing
    }
    dragSrcEl = document.querySelector('#node');
    expect(() => kanban.handleDragEnter(new MockEvent())).not.toThrow();
  });

  test('verify handleDragEnd() no exceptions', () => {
    document.body.innerHTML =
    `<div>
    <span id="backlog-column"/>
    <button id="addTask"/>
    <span id="main"/>
    <div class="flex-item">
<div class="item1" />
<div class="item2" />
<div class="item3" />
<div id="node" />
</div>
    </div>`;
    dragSrcEl = document.querySelector('#node');
    expect(() => kanban.handleDragEnd()).not.toThrow();
  });
  
  test('verify handleDrop() no exceptions', () => {
    document.body.innerHTML =
  `<div>
  <span id="backlog-column"/>
  <button id="addTask">
  <span id="main"/>
  <span id="inProgress-column"/>
  </div>`;

  class MockEvent {

    stopPropagation(){
      //nothing
    }
  }
    expect(() => kanban.handleDrop(new MockEvent())).not.toThrow();
  });
  
  test('verify createForm() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
    expect(() => kanban.createForm()).not.toThrow();
  });
  
  test('verify addTaskBox() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
<span id="taskbox"/>
</div>`;
    var mockBox = document.querySelector('#taskbox');
    expect(() => kanban.addTaskBox(mockBox)).not.toThrow();
  });
  
  test('verify addPriorityBox() no exceptions', () => {
    document.body.innerHTML =
    `<div>
    <span id="backlog-column"/>
    <button id="addTask">
    <span id="main"/>
    <span id="inProgress-column"/>
    <span id="taskbox"/>
    </div>`;
        var mockBox = document.querySelector('#taskbox');
    expect(() => kanban.addPriorityBox(mockBox)).not.toThrow();
  });
  
  test('verify addDueDate() no exceptions', () => {
    document.body.innerHTML =
    `<div>
    <span id="backlog-column"/>
    <button id="addTask">
    <span id="main"/>
    <span id="inProgress-column"/>
    <span id="taskbox"/>
    </div>`;
        var mockBox = document.querySelector('#taskbox');
    expect(() => kanban.addDueDate(mockBox)).not.toThrow();
  });
  
  test('verify addDescriptionBox() no exceptions', () => {
    document.body.innerHTML =
    `<div>
    <span id="backlog-column"/>
    <button id="addTask">
    <span id="main"/>
    <span id="inProgress-column"/>
    <span id="taskbox"/>
    </div>`;
        var mockBox = document.querySelector('#taskbox');
    expect(() => kanban.addDescriptionBox(mockBox)).not.toThrow();
  });
  
  test('verify addButtons() no exceptions', () => {
    document.body.innerHTML =
    `<div>
    <span id="backlog-column"/>
    <button id="addTask">
    <span id="main"/>
    <span id="inProgress-column"/>
    <span id="taskbox"/>
    </div>`;
        var mockBox = document.querySelector('#taskbox');
    expect(() => kanban.addButtons(mockBox)).not.toThrow();
  });
  
  test('verify drag() no exceptions', () => {
    document.body.innerHTML =
    `<div>
    <span id="backlog-column"/>
    <button id="addTask">
    <span id="main"/>
    <span id="inProgress-column"/>
    <input id="input"/>
    <form id="mockform" />
    <span class="dropdown-item" />
    <span id="priorityBtn" />
    </div>`;
    var mockBox = document.querySelector('#mockform');
    expect(() => kanban.drag(mockBox)).not.toThrow();
  }); 