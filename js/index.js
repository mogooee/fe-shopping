import { SearchKeyword } from "./components/search-keyword.js";
import { HistoryKeyword } from "./components/history-keyword.js";
import { HistoryKeywordController } from "./components/history-keyword-controller.js";
import { KeywordStore } from "./model/keywordStore.js";
import { Rendering } from "./view/rendering.js";

const Main = function () {
  this.rendering = new Rendering();
  this.keywordStore = new KeywordStore();
  this.searchKeyword = new SearchKeyword(this.keywordStore, this.rendering);
  this.historyKeyword = new HistoryKeyword(this.keywordStore, this.rendering);
  this.historyKeywordController = new HistoryKeywordController(this.historyKeyword);
};

Main.prototype.loadLocalStorage = function () {
  const HistoryKeyword = localStorage.getItem("search-keyword");
  if (HistoryKeyword) {
    const parsedHistoryKeyword = JSON.parse(HistoryKeyword);
    this.loadHistoryKeyword(parsedHistoryKeyword);
  }
};

Main.prototype.loadHistoryKeyword = function (historyKeyword) {
  this.keywordStore.historyKeyword = historyKeyword;
  this.rendering.historyKeyword(historyKeyword);
};

const main = new Main();
main.loadLocalStorage();
