import { maxKeywordNum } from "../constants.js";
import { $ } from "../utils/utils.js";

const inputForm = $(".search-keyword__input-text");
const historyKeywordList = $(".history-keyword--contents__list");

export class KeywordStore {
  constructor() {
    this.historyKeyword = [];
    this.keywordIndex = -1;
    this.focusIndex;
  }

  updateFocusIndex() {
    this.focusIndex = this.historyKeyword.length - 1;
    return this.focusIndex;
  }

  saveKeyword(keyword) {
    this.addHistoryKeyword(keyword);
    this.saveLocalStorage();
    this.initInputValue();
    this.increaseKeywordIndex();
  }

  addHistoryKeyword(keyword) {
    if (this.isMaxKeywordNum()) this.historyKeyword.shift();
    this.historyKeyword.push(keyword);
  }

  isMaxKeywordNum() {
    return this.historyKeyword.length > maxKeywordNum;
  }

  saveLocalStorage() {
    localStorage.setItem("search-keyword", JSON.stringify(this.historyKeyword));
  }

  initInputValue() {
    inputForm.value = "";
  }

  increaseKeywordIndex() {
    this.keywordIndex++;
  }

  changeFocusIndex(direction) {
    if (direction === "up") this.focusIndex++;
    else this.focusIndex--;
    this.checkFocusIndexLimit();
    return this.focusIndex;
  }

  checkFocusIndexLimit() {
    if (this.focusIndex > this.historyKeyword.length - 1) this.focusIndex = this.historyKeyword.length - 1;
    if (this.focusIndex < 0) this.focusIndex = 0;
  }

  getFocusKeywordElement(index) {
    return historyKeywordList.querySelectorAll("li")[index];
  }
}
