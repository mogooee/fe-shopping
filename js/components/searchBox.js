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

    input.addEventListener("keyup", async () => {
      if (this.isInputBlank()) {
        this.keywordStore.flag.autoCompletion = 0;
        this.onFocusSearchBox();
        return;
      }

      await this.autoCompleteKeyword();
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

  async autoCompleteKeyword() {
    const autoCompletionKeywordArr = await this.keywordStore.autoCompleteKeyword(input.value);
    const inputKeyword = this.keywordStore.inputKeyword;
    this.renderer.showAutoCompletionBox(autoCompletionKeywordArr);
    this.renderer.onfocusAutoCompletionKeyword(inputKeyword);
  }
}
