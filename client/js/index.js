import { SearchBox } from "./components/searchBox.js.js";
import { SearchHelperBox } from "./components/searchHelperBox.js";
import { RecentSearchBoxController } from "./components/recentSearchBoxController.js";
import { CategoryBox } from "./components/categoryBox.js";
import { KeywordStore } from "./model/keywordStore.js";
import { Renderer } from "./view/renderer.js";

const Main = function () {
  this.renderer = new Renderer();
  this.keywordStore = new KeywordStore();
  this.searchBox = new SearchBox(this.keywordStore, this.renderer);
  this.searchHelperBox = new SearchHelperBox(this.keywordStore, this.renderer);
  this.categoryBox = new CategoryBox(this.keywordStore, this.renderer);
  this.recentSearchBoxController = new RecentSearchBoxController(this.searchHelperBox);
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
    if (!this.isClickBlankSpace(e)) return;
    this.initFocusFlag();
    this.renderer.hideKeywordBox();
  });
};

Main.prototype.initFocusFlag = function () {
  this.keywordStore.flag.categoryBoxFocus = 0;
  this.keywordStore.flag.searchBoxFocus = 0;
};

Main.prototype.isClickBlankSpace = function ({ target }) {
  const searchBar = "search-bar";
  const searchBox = "search-box__input-text";
  const RecentSearchBoxController = "recent-search-box--controller";
  const recnetKeywordDeleteBtn = "recent-keyword__delete-btn";
  return (
    target.className !== searchBar &&
    target.className !== searchBox &&
    target.className !== recnetKeywordDeleteBtn &&
    target.parentNode.className !== recnetKeywordDeleteBtn &&
    target.parentNode.className !== RecentSearchBoxController
  );
};

const main = new Main();
main.init();
