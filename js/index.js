import { SearchBox } from "./components/SearchBox.js";
import { RecentSearchBox } from "./components/RecentSearchBox.js";
import { RecentSearchBoxController } from "./components/RecentSearchBoxController.js";
import { KeywordStore } from "./model/KeywordStore.js";
import { Renderer } from "./view/Renderer.js";

const Main = function () {
  this.renderer = new Renderer();
  this.keywordStore = new KeywordStore();
  this.searchBox = new SearchBox(this.keywordStore, this.renderer);
  this.recentSearchBox = new RecentSearchBox(this.keywordStore, this.renderer);
  this.recentSearchBoxController = new RecentSearchBoxController(this.recentSearchBox);
};

Main.prototype.loadLocalStorage = function () {
  const HistoryKeyword = localStorage.getItem("keyword-history");
  if (HistoryKeyword) {
    const parsedHistoryKeyword = JSON.parse(HistoryKeyword);
    this.loadHistoryKeyword(parsedHistoryKeyword);
  }
};

Main.prototype.loadHistoryKeyword = function (historyKeyword) {
  this.keywordStore.historyKeyword = historyKeyword;
  this.renderer.historyKeyword(historyKeyword);
};

Main.prototype.initEventListener = function () {
  const searchForm = "search-keyword__input-text";
  const historyController = "history-keyword--controller";
  document.addEventListener("click", (e) => {
    if (e.target.className === searchForm || e.target.parentNode.className === historyController) return;
    this.renderer.hiddenHistoryKeyword();
  });
};

const main = new Main();
main.loadLocalStorage();
main.initEventListener();
