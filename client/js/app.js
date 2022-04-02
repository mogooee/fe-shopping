import { $ } from "./utils/utils.js";
import { Header } from "./view/header/index.js";
import { Main } from "./view/main/index.js";

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

App.prototype.mount = async function () {
  const header = new Header($("header"));
  const main = new Main($(".main"));
  await header.render();
  await main.render();
  header.mount();
  main.mount();
};

const app = new App($("#app"));
app.render();
app.mount();
