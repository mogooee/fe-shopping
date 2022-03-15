import { SearchKeyword } from "./components/search-keyword.js";
import { HistoryKeyword } from "./components/history-keyword.js";
import { KeywordStore } from "./interface/keywordStore.js";
import { Rendering } from "./interface/rendering.js";

const Main = function () {
  this.rendering = new Rendering();
  this.keywordStore = new KeywordStore();
  this.searchKeyword = new SearchKeyword(this.keywordStore, this.rendering);
  this.historyKeyword = new HistoryKeyword(this.keywordStore, this.rendering);
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
