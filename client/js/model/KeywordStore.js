import { upKey } from "../constants/constants.js";

export class KeywordStore {
  constructor() {
    this.searchKeyword;
    this.recentKeywordArr = [];
    this.autoCompletionKeywordArr = [];
    this.focusIndex = -1;
    this.focusBox = "";
    this.recentKeywordSaveFlag = 1;
  }

  focusCategoryBox({ AFTER_FN }) {
    this.focusBox = this.focusBox === "categoryBox" ? "" : "categoryBox";
    this.focusIndex = -1;
    if (AFTER_FN) AFTER_FN();
  }

  updateKeyboardFocusIndex(arrowKey, boxLength, { AFTER_FN }, startIndex, finishIndex) {
    if (!boxLength) return;
    const minIndex = 0;
    const maxIndex = boxLength - 1;
    if (arrowKey === upKey) {
      this.focusIndex--;
      if (this.focusIndex < minIndex) {
        this.focusIndex = finishIndex;
        if (this.focusBox === "auto-search") return AFTER_FN(this.focusIndex, "keyboard", this.searchKeyword);
      }
    } else {
      this.focusIndex++;
      if (this.focusIndex > maxIndex) {
        this.focusIndex = startIndex;
        if (this.focusBox === "recent-search") return AFTER_FN(this.focusIndex, "keyboard", "");
      }
    }
    if (AFTER_FN) AFTER_FN(this.focusIndex, "keyboard");
  }

  updateMouseFocusIndex(index, { AFTER_FN }) {
    this.focusIndex = index;
    if (AFTER_FN) AFTER_FN(this.focusIndex, "mouse");
  }

  initRecentKeyword(keywordHistory) {
    this.recentKeywordArr = keywordHistory;
  }

  saveRecentKeyword(keyword, { AFTER_FN }) {
    this.focusBox = "recent-search";
    this.addRecentKeyword(keyword);
    this.saveLocalStorage();
    if (AFTER_FN) AFTER_FN(this.recentKeywordArr);
  }

  addRecentKeyword(keyword) {
    this.recentKeywordArr.push(keyword);
  }

  saveLocalStorage() {
    localStorage.setItem("keyword-history", JSON.stringify(this.recentKeywordArr));
  }

  deleteOverflowRecentKeyword({ AFTER_FN }) {
    this.recentKeywordArr.shift();
    this.saveLocalStorage();
    if (AFTER_FN) AFTER_FN();
  }

  deleteAllRecentKeyword() {
    this.recentKeywordArr = [];
    localStorage.setItem("keyword-history", "");
  }

  focusRecentSearch({ SAVE_ON, SAVE_OFF }) {
    this.focusBox = "recent-search";
    if (SAVE_ON || SAVE_OFF)
      if (this.recentKeywordSaveFlag) SAVE_ON(this.recentKeywordArr);
      else SAVE_OFF();
  }

  updateRecentKeyword(DeletedKeyword, { AFTER_FN }) {
    this.recentKeywordArr = this.recentKeywordArr.filter(
      (recentKeyword) => recentKeyword !== DeletedKeyword.dataset.value
    );
    this.saveLocalStorage();
    if (AFTER_FN) AFTER_FN(DeletedKeyword, this.recentKeywordArr);
  }

  toggleRecentKeywordSaveFlag({ AFTER_FN }) {
    this.recentKeywordSaveFlag = this.recentKeywordSaveFlag === 1 ? 0 : 1;
    if (AFTER_FN) AFTER_FN(this.recentKeywordArr);
  }

  saveAutoCompletionKeyword(searchKeyword, autoCompletionKeywords, { AFTER_FN }) {
    this.focusBox = "auto-search";
    this.focusIndex = -1;
    this.searchKeyword = searchKeyword;
    this.autoCompletionKeywordArr = autoCompletionKeywords;
    if (AFTER_FN) AFTER_FN(this.searchKeyword, this.autoCompletionKeywordArr);
  }

  async SaveAutoCompletionKeyword(searchKeyword, keywordArr) {
    this.searchKeyword = searchKeyword;
    this.autoCompletionKeywordArr = keywordArr;
    this.focusIndex = -1;
    this.focusBox = "autoCompletionBox";
  }
}
