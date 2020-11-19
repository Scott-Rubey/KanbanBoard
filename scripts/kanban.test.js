/* For the time being, this code may spit out a one-time set of errors based on
 the event listener code that isn't wrapped in a function, which gets called 1x
 in the code below. 
*/
document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
</div>`;
global.window = window;
global.$ = require('jquery');
const kanban = require('./kanban');

// Start tests here

test('tests populateBacklog() for success', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
</div>`;
    expect(() => kanban.populateBacklog()).not.toThrow();
  });