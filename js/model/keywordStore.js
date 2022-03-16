import { maxKeywordNum } from "../constants.js";
import { $ } from "../utils/utils.js";

const inputForm = $(".search-keyword__input-text");
const historyKeywordList = $(".history-keyword--contents__list");

export class KeywordStore {
  constructor() {
    this.historyKeyword = [];
    this.focusIndex = 0;
  }

  updateFocusIndex() {
    this.focusIndex = this.historyKeyword.length;
    return this.focusIndex;
  }

  saveKeyword(keyword) {
    this.addHistoryKeyword(keyword);
    this.saveLocalStorage();
    this.initInputValue();
  }

  addHistoryKeyword(keyword) {
    if (this.isMaxKeywordNum()) this.historyKeyword.shift();
    this.historyKeyword.push(keyword);
  }

  isMaxKeywordNum() {
    return this.historyKeyword.length === maxKeywordNum;
  }

  saveLocalStorage() {
    localStorage.setItem("search-keyword", JSON.stringify(this.historyKeyword));
  }

  initInputValue() {
    inputForm.value = "";
  }

  changeFocusIndex(event, base) {
    switch (event) {
      case "mouse":
        return this.findFocusIndex(base);
      case "keyboard":
        return this.calcFocusIndex(base);
    }
  }

  findFocusIndex(keywordElement) {
    this.historyKeyword.forEach((keyword, index) => {
      if (keyword === keywordElement.dataset.value) this.focusIndex = index;
    });
  }

  calcFocusIndex(direction) {
    if (direction === "up") this.focusIndex++;
    else this.focusIndex--;
    this.checkFocusIndexLimit();
    return this.focusIndex;
  }

  checkFocusIndexLimit() {
    if (this.focusIndex >= this.historyKeyword.length) {
      this.focusIndex = this.historyKeyword.length;
      this.initInputValue();
    }
    if (this.focusIndex < 0) this.focusIndex = this.historyKeyword.length - 1;
  }

  getFocusKeywordElement(index) {
    return historyKeywordList.querySelectorAll("li")[index];
  }

  delete() {
    this.historyKeyword = [];
    localStorage.setItem("search-keyword", "");
  }

  searchForm(keywordElement) {
    const searchForm = $(".search-keyword__input-text");
    searchForm.value = keywordElement.dataset.value;
  }

  toggleSaveCommand(command, button) {
    button.dataset.command = command === "on" ? "off" : "on";
  }
}
