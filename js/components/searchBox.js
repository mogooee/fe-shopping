import { $ } from "../utils/utils.js";
import { upKey, downKey } from "../constants/constants.js";

const form = $(".search-box__input");
const input = $(".search-box__input-text");

export class SearchBox {
  constructor(keywordStore, renderer) {
    this.keywordStore = keywordStore;
    this.renderer = renderer;
    this.init();
  }

  init() {
    this.initEventListeners();
  }

  initEventListeners() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.checkStorablilty()) {
        this.keywordStore.initInputForm();
        return;
      }
      this.inputKeyword();
    });

    input.addEventListener("focus", () => {
      this.onFocusSearchBox();
    });

    input.addEventListener("blur", () => {
      this.outFocusSearchBox();
    });

    input.addEventListener("keyup", ({ key }) => {
      if (this.isArrowKey(key)) {
        this.updateFocusIndex(key);
        return;
      }

      if (this.isInputBlank()) {
        this.keywordStore.flag.autoCompletion = 0;
        this.onFocusSearchBox();
        return;
      }

      this.keywordStore.autoCompleteKeyword(input.value);
      this.renderer.showAutoCompletionBox();
    });
  }

  isInputBlank() {
    return input.value.trim().length === 0;
  }

  checkStorablilty() {
    return !this.isInputBlank() && this.keywordStore.flag.recentKeywordSave;
  }

  onFocusSearchBox() {
    if (this.keywordStore.flag.autoCompletion) {
      this.renderer.showAutoCompletionBox();
      return;
    }

    if (!this.keywordStore.flag.recentKeywordSave) {
      this.renderer.showRecentSearchOffAlert();
      return;
    }

    this.updateRecentSearchBox();
  }

  updateRecentSearchBox() {
    this.keywordStore.flag.searchBoxFocus = 1;
    this.renderer.showRecentSearchBox();
  }

  outFocusSearchBox() {
    this.keywordStore.flag.searchBoxFocus = 0;
    const focusKeywordElement = $(".selected-keyword");
    focusKeywordElement && this.renderer.outFocusKeyword(focusKeywordElement);
  }

  isArrowKey(key) {
    return key === upKey || key === downKey;
  }

  updateFocusIndex(keyDirection) {
    if (!this.keywordStore.flag.searchBoxFocus) return;
    this.renderer.outFocusKeyword();
    this.updateFocusKeyword(keyDirection);
  }

  updateFocusKeyword(keyDirection) {
    const box = this.keywordStore.flag.autoCompletion ? "autoCompletion" : "recentSearch";
    const control = "keyboard";
    const changedIndex = this.keywordStore.changeFocusIndex(control, keyDirection, box);
    const focuskeywordElement = this.keywordStore.getFocusedKeywordElement(changedIndex, box);
    if (!focuskeywordElement) return;
    this.renderer.updateSearchBox(focuskeywordElement);
    this.renderer.onFocusKeyword(focuskeywordElement);
  }

  inputKeyword() {
    const keyword = input.value;
    if (this.keywordStore.isExistingRecentKeyword(keyword)) {
      this.keywordStore.initInputForm();
      return;
    }
    this.keywordStore.isMaxSavedKeywordNum() && this.renderer.removeLastRecentKeyword();
    this.keywordStore.saveKeyword(keyword);
    this.renderer.inputRecentKeyword([keyword]);
  }
}
