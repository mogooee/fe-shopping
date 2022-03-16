import { $ } from "../utils/utils.js";

const form = $(".search-keyword__input");
const input = $(".search-keyword__input-text");

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
      this.onFocusSearchForm();
    });

    input.addEventListener("blur", () => {
      this.outFocusKeyword();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.isBlank()) return;
      this.inputKeyword();
    });
  }

  onFocusSearchForm() {
    const updatedIndex = this.keywordStore.updateFocusIndex();
    const keywordElement = this.keywordStore.getFocusKeywordElement(updatedIndex);
    this.renderer.showHistoryKeyword();
    keywordElement && this.renderer.onFocusKeyword(keywordElement);
  }

  outFocusKeyword() {
    const focusKeywordElement = $(".selected-keyword");
    focusKeywordElement && this.renderer.outFocusKeyword(focusKeywordElement);
  }

  inputKeyword() {
    const keyword = input.value;
    this.keywordStore.isMaxKeywordNum() && this.renderer.removeFirstKeyword();
    this.keywordStore.saveKeyword(keyword);
    this.renderer.historyKeyword([keyword]);
  }

  isBlank() {
    return input.value.trim().length === 0;
  }
}
