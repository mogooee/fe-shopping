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

    this.input.addEventListener("keyup", async ({ key }) => {
      if (this.checkArrowKey(key)) return;
      if (key === "Enter" || this.isInputBlank()) return this.onFocusRecentSearchBox();
      if (!this.isInputBlank()) await this.autoCompleteKeyword();
    });
  }

  searchKeyword() {
    this.keywordStore.flag.autoCompletion = 0;
    const keyword = this.input.value;
    if (this.keywordStore.isExistingRecentKeyword(keyword)) {
      this.keywordStore.initInputForm();
      return;
    }
    if (!this.keywordStore.flag.recentKeywordSave || this.isInputBlank()) return (this.input.value = "");
    this.keywordStore.isMaxSavedKeywordNum() && this.recentSearchBox.removeOverflowKeyword();
    this.keywordStore.saveKeyword(keyword);
    this.recentSearchBox.inputRecentKeyword(this.keywordStore.recentKeywordArr);
  }

  isInputBlank() {
    return this.input.value.trim().length === 0;
  }

  async onFocusSearchBox() {
    this.keywordStore.flag.searchBoxFocus = 1;
    this.keywordStore.flag.categoryBoxFocus = 0;
    this.categoryOptionBox.hideCategoryOptionBox();
    if (this.keywordStore.flag.autoCompletion) {
      if (!this.isInputBlank) await this.autoCompleteKeyword();
      return;
    }
    this.onFocusRecentSearchBox();
  }

  outFocusSearchBox() {
    this.keywordStore.flag.categoryBoxFocus = 0;
    this.keywordStore.flag.searchBoxFocus = 0;
    this.recentSearchBox.hideRecentSearchBox();
    this.autoCompletionBox.hideAutoCompletionBox();
  }

  onFocusRecentSearchBox() {
    this.keywordStore.flag.autoCompletion = 0;
    this.keywordStore.flag.categoryBoxFocus = 0;
    this.autoCompletionBox.hideAutoCompletionBox();
    if (!this.keywordStore.flag.recentKeywordSave) {
      this.recentSearchBox.showRecentSearchOffAlert();
      return;
    }
    this.recentSearchBox.showRecentSearchBox();
  }

  async autoCompleteKeyword() {
    const autoCompletionKeywordArr = await this.keywordStore.autoCompleteKeyword(this.input.value);
    const inputKeyword = this.keywordStore.inputKeyword;
    this.autoCompletionBox.showAutoCompletionBox(autoCompletionKeywordArr);
    this.categoryOptionBox.hideCategoryOptionBox();
    this.autoCompletionBox.onfocusAutoCompletionKeyword(inputKeyword);
  }

  checkArrowKey(key) {
    return key === upKey || key === downKey;
  }
}
