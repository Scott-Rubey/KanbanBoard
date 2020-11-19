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
  backlogColumn = document.querySelector('.item1');
  inProgressColumn = document.querySelector('.item2');
  completeColumn = document.querySelector('.item3');
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
    expect(() => kanban.handleDragEnter(new MockEvent())).not.toThrow();
  });

  test('verify handleDragEnd() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
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
    expect(() => handleDrop()).not.toThrow();
  });
  
  test('verify createForm() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
    expect(() => createForm()).not.toThrow();
  });
  
  test('verify addTaskBox() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
    expect(() => addTaskBox()).not.toThrow();
  });
  
  test('verify addPriorityBox() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
    expect(() => addPriorityBox()).not.toThrow();
  });
  
  test('verify addDueDate() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
    expect(() => addDueDate()).not.toThrow();
  });
  
  test('verify addDescriptionBox() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
    expect(() => addDescriptionBox()).not.toThrow();
  });
  
  test('verify addButtons() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
    expect(() => addButtons()).not.toThrow();
  });
  
  test('verify drag() no exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
    expect(() => drag()).not.toThrow();
  }); 