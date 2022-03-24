import { $ } from "../utils/utils.js";
import { upKey, downKey } from "../constants/constants.js";

export class SearchBoxController {
  constructor(keywordStore, recentSearchBox, categoryOptionBox, autoCompletionBox) {
    this.keywordStore = keywordStore;
    this.recentSearchBox = recentSearchBox;
    this.categoryOptionBox = categoryOptionBox;
    this.autoCompletionBox = autoCompletionBox;
    this.setState();
    this.setEvent();
  }

  setState() {
    this.form = $(".search-box__input");
    this.input = $(".search-box__input-text");
  }

  setEvent() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.searchKeyword();
    });

    this.input.addEventListener("focus", () => {
      this.onFocusSearchBox();
    });

    this.input.addEventListener("blur", () => {
      this.outFocusSearchBox();
    });

    this.input.addEventListener("keyup", async (e) => {
      if (this.checkArrowKey(e.key)) return;
      if (e.key === "Enter" || this.isInputBlank()) {
        this.keywordStore.delay.clear();
        this.onFocusRecentSearchBox();
        return;
      }
      if (!this.isInputBlank()) await this.autoCompleteKeyword();
    });
  }

  searchKeyword() {
    const keyword = this.input.value;
    if (this.keywordStore.isExistingRecentKeyword(keyword)) {
      this.keywordStore.initInputForm();
      return;
    }
    if (!this.keywordStore.recentKeywordSaveFlag || this.isInputBlank()) return (this.input.value = "");
    this.keywordStore.isMaxSavedKeywordNum() && this.recentSearchBox.removeOverflowKeyword();
    this.keywordStore.saveKeyword(keyword);
    this.recentSearchBox.inputRecentKeyword(this.keywordStore.recentKeywordArr);
  }

  isInputBlank() {
    return this.input.value.trim().length === 0;
  }

  async onFocusSearchBox() {
    this.categoryOptionBox.hideCategoryOptionBox();
    if (this.keywordStore.focusBox === "autoCompletionBox") {
      if (!this.isInputBlank()) await this.autoCompleteKeyword();
      return;
    }
    this.onFocusRecentSearchBox();
  }

  outFocusSearchBox() {
    this.recentSearchBox.hideRecentSearchBox();
    this.autoCompletionBox.hideAutoCompletionBox();
  }

  onFocusRecentSearchBox() {
    this.keywordStore.focusBox = "recentSearchBox";
    this.autoCompletionBox.hideAutoCompletionBox();
    if (!this.keywordStore.recentKeywordSaveFlag) {
      this.recentSearchBox.showRecentSearchOffAlert();
      return;
    }
    this.recentSearchBox.showRecentSearchBox();
  }

  async autoCompleteKeyword() {
    const autoCompletionKeywordArr = await this.keywordStore.autoCompleteKeyword(this.input.value);
    const inputKeyword = this.keywordStore.inputKeyword;
    this.keywordStore.focusBox = "autoCompletionBox";
    this.autoCompletionBox.showAutoCompletionBox(autoCompletionKeywordArr);
    this.categoryOptionBox.hideCategoryOptionBox();
    this.autoCompletionBox.onfocusAutoCompletionKeyword(inputKeyword);
  }

  checkArrowKey(key) {
    return key === upKey || key === downKey;
  }
}
