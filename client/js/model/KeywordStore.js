import { maxKeywordNum, upKey, downKey } from "../constants/constants.js";
import { $, delay } from "../utils/utils.js";

export class KeywordStore {
  constructor() {
    this.inputKeyword;
    this.recentKeywordArr = [];
    this.focusIndex = 0;
    this.flag = { recentKeywordSave: 1, searchBoxFocus: 0, categoryBoxFocus: 0, autoCompletion: 0 };
    this.loadKeywordHistoryLocalStorage();
  }

  loadKeywordHistoryLocalStorage() {
    const keywordHistory = localStorage.getItem("keyword-history");
    if (keywordHistory) this.recentKeywordArr = JSON.parse(keywordHistory);
  }

  initRecentKeyword() {
    this.recentKeywordArr = [];
    localStorage.setItem("keyword-history", "");
  }

  saveKeyword(keyword) {
    this.addRecentKeyword(keyword);
    this.saveLocalStorage();
    this.initInputForm();
  }

  isExistingRecentKeyword(keyword) {
    return this.recentKeywordArr.includes(keyword);
  }

  addRecentKeyword(keyword) {
    this.isMaxSavedKeywordNum() && this.recentKeywordArr.shift();
    this.recentKeywordArr.push(keyword);
  }

  updateRecentKeyword(DeletedKeyword) {
    this.recentKeywordArr = this.recentKeywordArr.filter((recentKeyword) => recentKeyword !== DeletedKeyword);
  }

  isMaxSavedKeywordNum() {
    return this.recentKeywordArr.length === maxKeywordNum;
  }

  saveLocalStorage() {
    localStorage.setItem("keyword-history", JSON.stringify(this.recentKeywordArr));
  }

  initInputForm() {
    const inputForm = $(".search-box__input-text");
    inputForm.value = "";
  }

  keepInputForm() {
    const inputForm = $(".search-box__input-text");
    inputForm.value = this.inputKeyword;
  }

  changeFocusIndex(event, base, box) {
    switch (event) {
      case "mouse":
        return this.findFocusIndex(base);
      case "keyboard":
        return this.calcFocusIndex(base, box);
    }
  }

  findFocusIndex(keywordElement) {
    this.focusIndex = keywordElement.dataset.index;
    return this.focusIndex;
  }

  calcFocusIndex(ArrowKey, box) {
    if (box === "recentSearch") ArrowKey = ArrowKey === upKey ? downKey : upKey;

    if (ArrowKey === upKey) this.focusIndex--;
    else this.focusIndex++;

    this.checkFocusIndexLimit(box);
    return this.focusIndex;
  }

  checkFocusIndexLimit(box) {
    const keywordList = this.decideKeywordList(box);
    const keywordArr = Array.from(keywordList.children);
    if (box === "recentSearch") {
      if (this.focusIndex >= keywordArr.length) {
        this.focusIndex = keywordArr.length;
        this.initInputForm();
      }
      if (this.focusIndex < 0) this.focusIndex = keywordArr.length - 1;
      return;
    }
    if (this.focusIndex >= keywordArr.length) this.focusIndex = 0;
    if (this.focusIndex < 0) {
      this.focusIndex = -1;
      if (box === "autoCompletion") this.keepInputForm();
    }
  }

  getFocusedKeywordElement(index, box) {
    const keywordList = this.decideKeywordList(box);
    return keywordList.querySelectorAll("li")[index];
  }

  decideKeywordList(box) {
    const recentKeywordList = $(".recent-search-box__contents__list");
    const autoCompletionKeywordList = $(".auto-completion-box__contents__list");
    const categoryList = $(".category-option-box__contents__list");
    if (box === "autoCompletion") return autoCompletionKeywordList;
    if (box === "category") return categoryList;
    else return recentKeywordList;
  }

  toggleKeywordSaveCommand(command) {
    const saveBtn = $(".saveBtn");
    saveBtn.dataset.command = command === "on" ? "off" : "on";
  }

  async autoCompleteKeyword(keyword) {
    await this.delayAutoCompletion();
    this.inputKeyword = keyword;
    this.flag.autoCompletion = 1;
    this.focusIndex = -1;
    const response = await fetch(`http://localhost:3000/autocomplete?keyword=${keyword}`);
    const data = await response.json();
    return data.sort((a, b) => b.views - a.views).map((item) => item.keyword);
  }

  async delayAutoCompletion() {
    delay.clear();
    await delay.set(100);
  }
}
