import { SearchBox } from "./components/SearchBox.js";
import { RecentSearchBox } from "./components/RecentSearchBox.js";
import { RecentSearchBoxController } from "./components/RecentSearchBoxController.js";
import { Renderer } from "./view/Renderer.js";
import { KeywordStore } from "./model/KeywordStore.js";

const Main = function () {
  this.renderer = new Renderer();
  this.keywordStore = new KeywordStore();
  this.searchBox = new SearchBox(this.keywordStore, this.renderer);
  this.recentSearchBox = new RecentSearchBox(this.keywordStore, this.renderer);
  this.recentSearchBoxController = new RecentSearchBoxController(this.recentSearchBox);
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
  const searchBox = "search-box__input-text";
  const RecentSearchBoxController = "recent-search-box--controller";
  document.addEventListener("click", (e) => {
    if (e.target.className === searchBox || e.target.parentNode.className === RecentSearchBoxController)
      return;
    this.renderer.hideRecentSearchBox();
  });
};

const main = new Main();
main.loadLocalStorage();
main.initEventListener();
