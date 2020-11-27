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
const login = require('./logout');

test('verify signOut() throws exceptions', () => {
    document.body.innerHTML =
`<div>
<span id="backlog-column"/>
<button id="addTask">
<span id="main"/>
<span id="inProgress-column"/>
</div>`;
class Mockgapi{
  auth2;
  constructor(){
    this.auth2 = new Mockauth2();
  }
}
class Mockauth2{
  getAuthInstance(){
    return true;
  }

  signOut(){
    return true;
  }
}

gapi = new Mockgapi();
    expect(() => login.signOut()).toThrow();
  });