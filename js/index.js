import { SearchBox } from "./components/searchBox.js";
import { RecentSearchBox } from "./components/recentSearchBox.js";
import { KeywordStore } from "./model/keywordStore.js";
import { RecentSearchBoxController } from "./components/recentSearchBoxController.js";
import { Renderer } from "./view/renderer.js";

const Main = function () {
  this.renderer = new Renderer();
  this.keywordStore = new KeywordStore();
  this.searchBox = new SearchBox(this.keywordStore, this.renderer);
  this.recentSearchBox = new RecentSearchBox(this.keywordStore, this.renderer);
  this.recentSearchBoxController = new RecentSearchBoxController(this.recentSearchBox);
};

Main.prototype.init = function () {
  this.loadLocalStorage();
  this.initEventListener();
};

Main.prototype.loadLocalStorage = function () {
  const keywordHistory = localStorage.getItem("keyword-history");
  if (keywordHistory) {
    const parsedkeywordHistory = JSON.parse(keywordHistory);
    this.loadkeywordHistory(parsedkeywordHistory);
  }
};

Main.prototype.loadkeywordHistory = function (keywordHistory) {
  this.keywordStore.recentKeywordArr = keywordHistory;
  this.renderer.inputRecentKeyword(keywordHistory);
};

Main.prototype.initEventListener = function () {
  document.addEventListener("click", (e) => {
    if (this.isClickBlankSpace(e)) return;
    this.renderer.hideRecentSearchBox();
  });
};

Main.prototype.isClickBlankSpace = function (e) {
  const searchBox = "search-box__input-text";
  const RecentSearchBoxController = "recent-search-box--controller";
  return e.target.className === searchBox || e.target.parentNode.className === RecentSearchBoxController;
};
const main = new Main();
main.init();
