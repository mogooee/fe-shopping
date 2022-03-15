import { maxKeywordNum } from "../constants.js";

export class KeywordStore {
  constructor(rendering) {
    this.rendering = rendering;
    this.historyKeyword = [];
  }
  loadHistoryKeyword(keyword) {
    this.historyKeyword = keyword;
    this.rendering.historyKeyword(keyword);
  }
  addKeyword(keyword) {
    this.saveKeyword(keyword);
    this.saveLocalStorage();
    this.rendering.historyKeyword([keyword]);
  }
  saveKeyword(keyword) {
    console.log(this.historyKeyword.length, maxKeywordNum);
    console.log(this.isMaxKeywordNum());
    if (this.isMaxKeywordNum()) {
      this.historyKeyword.shift();
      this.rendering.removeFirstKeyword();
    }
    this.historyKeyword.push(keyword);
  }
  isMaxKeywordNum() {
    return this.historyKeyword.length > maxKeywordNum;
  }
  saveLocalStorage() {
    localStorage.setItem("search-keyword", JSON.stringify(this.historyKeyword));
  }
}
