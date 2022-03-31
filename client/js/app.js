import { $ } from "./utils/utils.js";
import { Header } from "./view/header/index.js";

const App = function (target) {
  this.target = target;
};

App.prototype.template = function () {
  return `<header></header>
          <div class="main"></div>
          <footer></footer>`;
};

App.prototype.render = function () {
  this.target.innerHTML = this.template();
};

App.prototype.mount = function () {
  const header = new Header($("header"));
  header.render();
  header.mount();
};

const app = new App($("#app"));
app.render();
app.mount();
