import { $, $$ } from "../../utils/utils.js";

export class HistoryKeyword {
  constructor() {
    this.historyKeyword = [];
    this.maxKeywordNum = 8;
    this.init();
  }
  init() {
    this.loadLocalStorage();
  }
  saveKeyword(keyword) {
    if (this.isMaxKeywordNum()) this.historyKeyword.shift();
    this.historyKeyword.push(keyword);
  }
  loadLocalStorage() {
    const loadHistoryKeyword = localStorage.getItem("search-keyword");
    if (loadHistoryKeyword) {
      const parsedHistoryKeyword = JSON.parse(loadHistoryKeyword);
      this.historyKeyword = parsedHistoryKeyword;
      this.render(parsedHistoryKeyword);
    }
  }
  saveLocalStorage() {
    localStorage.setItem("search-keyword", JSON.stringify(this.historyKeyword));
  }
  render(keyword) {
    const position = "beforeend";
    const historyKeywordList = $(".history-keyword--contents__list");
    const inputKeyword = keyword.map((keyword) => `<li>${keyword}</li>`).join("");
    historyKeywordList.insertAdjacentHTML(position, inputKeyword);
    if (this.isMaxKeywordNum()) this.removeFirstKeyword();
  }
  isMaxKeywordNum() {
    return this.historyKeyword.length > this.maxKeywordNum;
  }
  removeFirstKeyword() {
    const historyKeywordList = $(".history-keyword--contents__list");
    const firstKeyword = $(".history-keyword--contents__list li");
    historyKeywordList.removeChild(firstKeyword);
  }
}
