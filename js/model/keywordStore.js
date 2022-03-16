import { maxKeywordNum } from "../constants.js";
import { $ } from "../utils/utils.js";

const inputForm = $(".search-box__input-text");
const recentKeywordList = $(".recent-search-box--contents__list");

export class KeywordStore {
  constructor() {
    this.recentKeywordArr = [];
    this.focusIndex = 0;
    this.recentKeywordSaveFlag = 1;
  }

  updateFocusIndex() {
    this.focusIndex = this.recentKeywordArr.length;
    return this.focusIndex;
  }

  isExistingRecentKeyword(keyword) {
    return this.recentKeywordArr.includes(keyword);
  }

  saveKeyword(keyword) {
    this.addRecentKeyword(keyword);
    this.saveLocalStorage();
    this.initInputForm();
  }

  addRecentKeyword(keyword) {
    this.isMaxSavedKeywordNum() && this.recentKeywordArr.shift();
    this.recentKeywordArr.push(keyword);
  }

  isMaxSavedKeywordNum() {
    return this.recentKeywordArr.length === maxKeywordNum;
  }

  saveLocalStorage() {
    localStorage.setItem("keyword-history", JSON.stringify(this.recentKeywordArr));
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
    this.recentKeywordArr.forEach((keyword, index) => {
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
    if (this.focusIndex >= this.recentKeywordArr.length) {
      this.focusIndex = this.recentKeywordArr.length;
      this.initInputForm();
    }
    if (this.focusIndex < 0) this.focusIndex = this.recentKeywordArr.length - 1;
  }

  getFocusedKeywordElement(index) {
    return recentKeywordList.querySelectorAll("li")[index];
  }

  initRecentKeyword() {
    this.recentKeywordArr = [];
    localStorage.setItem("keyword-history", "");
  }

  toggleKeywordSaveCommand(command, button) {
    button.dataset.command = command === "on" ? "off" : "on";
  }
}
