import { maxKeywordNum, upKey, downKey, categoryKeywordArr } from "../constants/constants.js";
import { $, delay } from "../utils/utils.js";

export class KeywordStore {
  constructor() {
    this.recentKeywordArr = [];
    this.autoCompletionKeywordArr = [];
    this.categoryKeywordArr = categoryKeywordArr;
    this.inputKeyword;
    this.focusIndex = 0;
    this.flag = { recentKeywordSave: 1, searchBoxFocus: 0, categoryBoxFocus: 0, autoCompletion: 0 };
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

  updateRecentKeyword(DeletedKeyword) {
    this.recentKeywordArr = this.recentKeywordArr.filter((recentKeyword) => recentKeyword !== DeletedKeyword);
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
        return this.findFocusIndex(base, box);
      case "keyboard":
        return this.calcFocusIndex(base, box);
    }
  }

  findFocusIndex(keywordElement, box) {
    const keywordArr = this.decideKeywordArr(box);
    keywordArr.forEach((keyword, index) => {
      if (keyword === keywordElement.dataset.value) this.focusIndex = index;
    });
  }

  decideKeywordArr(box) {
    if (box === "autoCompletion") return this.autoCompletionKeywordArr;
    if (box === "category") return this.categoryKeywordArr;
    else return this.recentKeywordArr;
  }

  calcFocusIndex(ArrowKey, box) {
    if (box === "recentSearch") ArrowKey = ArrowKey === upKey ? downKey : upKey;

    if (ArrowKey === upKey) this.focusIndex--;
    else this.focusIndex++;

    this.checkFocusIndexLimit(box);
    return this.focusIndex;
  }

  checkFocusIndexLimit(box) {
    const keywordArr = this.decideKeywordArr(box);
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

  initRecentKeyword() {
    this.recentKeywordArr = [];
    localStorage.setItem("keyword-history", "");
  }

  toggleKeywordSaveCommand(command) {
    const saveBtn = $(".saveBtn");
    saveBtn.dataset.command = command === "on" ? "off" : "on";
  }

  async autoCompleteKeyword(keyword) {
    await this.delayAutoCompletion();
    this.flag.autoCompletion = 1;
    this.inputKeyword = keyword;
    return fetch(`http://localhost:3000/autocomplete?keyword=${keyword}`)
      .then((res) => res.json())
      .then((data) => data.sort((a, b) => b.views - a.views).map((item) => item.keyword))
      .then((autoCompletionKeyword) => {
        this.focusIndex = -1;
        this.autoCompletionKeywordArr = autoCompletionKeyword;
        return this.autoCompletionKeywordArr;
      });
  }

  async delayAutoCompletion() {
    delay.clear();
    await delay.set(500);
  }
}
