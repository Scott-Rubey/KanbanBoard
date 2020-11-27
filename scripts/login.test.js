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
const login = require('./login');

test('verify onSignIn() does not throw exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
class MockGoogle {
    getBasicProfile(){
        return new MockProfile();
      }
  }

class MockProfile {
    getName(){
        //nothing
      }

      getEmail(){
        //nothing
      }

      getImageUrl(){
          //nothing
      }
}

    expect(() => login.onSignIn(new MockGoogle())).not.toThrow();
  });