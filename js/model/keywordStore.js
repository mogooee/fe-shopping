import { maxKeywordNum, upKey, downKey } from "../constants/constants.js";
import { $ } from "../utils/utils.js";

const inputForm = $(".search-box__input-text");
const recentKeywordList = $(".recent-search-box__contents__list");
const autoCompletionKeywordList = $(".auto-completion-box__contents__list");

export class KeywordStore {
  constructor() {
    this.recentKeywordArr = [];
    this.autoCompletionKeywordArr = [];
    this.inputKeyword;
    this.focusIndex = 0;
    this.flag = { recentKeywordSave: 1, searchBoxFocus: 0, autoCompletion: 0 };
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

  initInputForm(box) {
    inputForm.value = box === "autoCompletion" ? this.inputKeyword : "";
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
    const keywordArr = box === "autoCompletion" ? this.autoCompletionKeywordArr : this.recentKeywordArr;
    keywordArr.forEach((keyword, index) => {
      if (keyword === keywordElement.dataset.value) this.focusIndex = index;
    });
  }

  calcFocusIndex(keyDirection, box) {
    if (box === "autoCompletion") keyDirection = keyDirection === upKey ? downKey : upKey;

    if (keyDirection === upKey) this.focusIndex++;
    else this.focusIndex--;

    this.checkFocusIndexLimit(box);
    return this.focusIndex;
  }

  checkFocusIndexLimit(box) {
    const keywordArr = box === "autoCompletion" ? this.autoCompletionKeywordArr : this.recentKeywordArr;
    if (box === "autoCompletion") {
      if (this.focusIndex >= keywordArr.length) this.focusIndex = 0;
      if (this.focusIndex < 0) {
        this.focusIndex = -1;
        this.initInputForm(box);
      }
    } else {
      if (this.focusIndex >= keywordArr.length) {
        this.focusIndex = keywordArr.length;
        this.initInputForm(box);
      }
      if (this.focusIndex < 0) this.focusIndex = keywordArr.length - 1;
    }
  }

  getFocusedKeywordElement(index, box) {
    const keywordList = box === "autoCompletion" ? autoCompletionKeywordList : recentKeywordList;
    return keywordList.querySelectorAll("li")[index];
  }

  initRecentKeyword() {
    this.recentKeywordArr = [];
    localStorage.setItem("keyword-history", "");
  }

  toggleKeywordSaveCommand(command) {
    const saveBtn = $(".saveBtn");
    saveBtn.dataset.command = command === "on" ? "off" : "on";
  }

  autoCompleteKeyword(keyword) {
    this.flag.autoCompletion = 1;
    this.inputKeyword = keyword;
    return fetch(
      `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${keyword}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`
    )
      .then((res) => res.json())
      .then((data) => data.suggestions.map((v) => v.value))
      .then((autoCompletionKeyword) => {
        this.focusIndex = -1;
        this.autoCompletionKeywordArr = autoCompletionKeyword;
        return autoCompletionKeyword;
      });
  }
}
