import { maxKeywordNum } from "../constants.js";
import { $ } from "../utils/utils.js";

const inputForm = $(".search-box__input-text");
const recentKeywordList = $(".recent-search-box--contents__list");

export class KeywordStore {
  constructor() {
    this.historyKeyword = [];
    this.focusIndex = 0;
    this.recentKeywordSaveFlag = 1;
  }

  updateFocusIndex() {
    this.focusIndex = this.historyKeyword.length;
    return this.focusIndex;
  }

  saveKeyword(keyword) {
    this.addHistoryKeyword(keyword);
    this.saveLocalStorage();
    this.initInputForm();
  }

  addHistoryKeyword(keyword) {
    this.isMaxSavedKeywordNum() && this.historyKeyword.shift();
    this.historyKeyword.push(keyword);
  }

  isMaxSavedKeywordNum() {
    return this.historyKeyword.length === maxKeywordNum;
  }

  saveLocalStorage() {
    localStorage.setItem("keyword-history", JSON.stringify(this.historyKeyword));
  }

  initInputForm() {
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
      this.initInputForm();
    }
    if (this.focusIndex < 0) this.focusIndex = this.historyKeyword.length - 1;
  }

  getFocusedKeywordElement(index) {
    return recentKeywordList.querySelectorAll("li")[index];
  }

  initRecentKeyword() {
    this.historyKeyword = [];
    localStorage.setItem("keyword-history", "");
  }

  toggleKeywordSaveCommand(command, button) {
    button.dataset.command = command === "on" ? "off" : "on";
  }
}
