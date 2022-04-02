import { delay, fetchData } from "../../utils/utils.js";
import { maxKeywordNum, upKey, downKey } from "../../constants/constants.js";

export class SearchBarController {
  constructor(keywordStore) {
    this.keywordStore = keywordStore;
    this.delay = delay;
  }

  loadKeywordHistoryLocalStorage() {
    const keywordHistory = localStorage.getItem("keyword-history");
    if (keywordHistory) this.keywordStore.initRecentKeyword(JSON.parse(keywordHistory));
  }

  outFocusSearchBox() {
    this.hideSearchPopup();
  }

  searchProduct(searchKeyword) {
    this.delay.clear();
    if (!searchKeyword) searchKeyword = this.searchBoxInput.value;
    if (!this.hasStorability(searchKeyword)) {
      this.initSearchBoxInput();
      this.focusRecentSearch();
      return;
    }
    this.keywordStore.saveRecentKeyword(searchKeyword, { AFTER_FN: this.renderRecentSearch });
    this.OverMaxRecentKeywordNum() &&
      this.keywordStore.deleteOverflowRecentKeyword({ AFTER_FN: this.removeOverflowKeyword });
    this.initSearchBoxInput();
  }

  hasStorability(searchKeyword) {
    return this.keywordStore.recentKeywordSaveFlag && !this.hasKeyword(searchKeyword) && !this.isInputBlank();
  }

  hasKeyword(keyword) {
    return this.keywordStore.recentKeywordArr.includes(keyword);
  }

  isInputBlank() {
    return this.searchBoxInput.value.trim().length === 0;
  }

  initSearchBoxInput() {
    this.searchBoxInput.value = "";
  }

  focusRecentSearch() {
    this.keywordStore.focusRecentSearch({
      SAVE_ON: this.renderRecentSearch,
      SAVE_OFF: this.renderRecentSearchOff,
    });
  }

  OverMaxRecentKeywordNum() {
    return this.keywordStore.recentKeywordArr.length > maxKeywordNum;
  }

  async onFocusSearchBox() {
    this.renderSearchPopup();
    const searchKeyword = this.searchBoxInput.value;
    if (searchKeyword) {
      this.keywordStore.focusBox = "auto-search";
      await this.autoCompleteKeyword();
    } else {
      this.keywordStore.focusBox = "recent-search";
      this.focusRecentSearch();
    }
  }

  async typeKey() {
    if (!this.isInputBlank()) await this.autoCompleteKeyword();
    else {
      this.delay.clear();
      this.focusRecentSearch();
    }
  }

  async autoCompleteKeyword() {
    await this.delayAutoCompletion();
    const searchKeyword = this.searchBoxInput.value;
    const data = await fetchData(
      `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${searchKeyword}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`
    );
    const autoCompletionKeywords = data.suggestions.map((v) => v.value);
    this.keywordStore.saveAutoCompletionKeyword(searchKeyword, autoCompletionKeywords, {
      AFTER_FN: this.renderAutoSearch,
    });
  }

  async delayAutoCompletion() {
    this.delay.clear();
    await this.delay.set(500);
  }

  hoverKeyword(target) {
    this.keywordStore.updateMouseFocusIndex(target.dataset.index, { AFTER_FN: this.focusKeyword });
  }

  selectKeywordKeyboard(arrowKey) {
    if (!this.openPopup()) return;
    const searchPopupListLength = this.updateSearchPopupListLength();
    const [updatedArrowKey, startIndex, finishIndex] = this.handlePopup(arrowKey, searchPopupListLength);
    this.keywordStore.updateKeyboardFocusIndex(
      updatedArrowKey,
      searchPopupListLength,
      {
        AFTER_FN: this.focusKeyword,
      },
      startIndex,
      finishIndex
    );
  }

  openPopup() {
    return this.keywordStore.focusBox === "recent-search" || this.keywordStore.focusBox === "auto-search";
  }

  handlePopup(arrowKey, searchPopupListLength) {
    let startIndex, finalIndex;
    if (this.keywordStore.focusBox === "recent-search") {
      startIndex = searchPopupListLength;
      finalIndex = searchPopupListLength - 1;
      arrowKey = arrowKey === downKey ? upKey : downKey;
    } else {
      startIndex = 0;
      finalIndex = -1;
    }
    return [arrowKey, startIndex, finalIndex];
  }

  deleteRecentKeyword(recentKeyword) {
    this.keywordStore.updateRecentKeyword(recentKeyword, { AFTER_FN: this.removeRecentKeyword });
  }

  controlHistoryBtns(command) {
    if (command === "delete") {
      this.keywordStore.deleteAllRecentKeyword();
      this.focusRecentSearch();
    } else {
      this.keywordStore.toggleRecentKeywordSaveFlag({ AFTER_FN: this.toggleRecentSearchOff });
    }
  }
}
