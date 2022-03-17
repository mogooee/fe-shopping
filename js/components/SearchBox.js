import { $ } from "../utils/utils.js";

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
    input.addEventListener("focus", () => {
      if (!this.keywordStore.recentKeywordSaveFlag) {
        this.renderer.showRecentSearchOffAlert();
        return;
      }
      this.onFocusSearchBox();
    });

    input.addEventListener("blur", () => {
      this.outFocusSearchBox();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.isBlank() || !this.keywordStore.recentKeywordSaveFlag) {
        this.keywordStore.initInputForm();
        return;
      }
      this.inputKeyword();
    });
  }

  onFocusSearchBox() {
    this.keywordStore.searchBoxFocusFlag = 1;
    const updatedIndex = this.keywordStore.updateFocusIndex();
    const keywordElement = this.keywordStore.getFocusedKeywordElement(updatedIndex);
    this.renderer.showRecentSearchBox();
    keywordElement && this.renderer.onFocusKeyword(keywordElement);
  }

  outFocusSearchBox() {
    this.keywordStore.searchBoxFocusFlag = 0;
    const focusKeywordElement = $(".selected-keyword");
    focusKeywordElement && this.renderer.outFocusKeyword(focusKeywordElement);
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

  isBlank() {
    return input.value.trim().length === 0;
  }
}
