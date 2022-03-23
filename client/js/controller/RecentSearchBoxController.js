import { $ } from "../utils/utils.js";

export class RecentSearchBoxController {
  constructor(keywordStore, recentSearchBox) {
    this.keywordStore = keywordStore;
    this.recentSearchBox = recentSearchBox;
    this.setState();
    this.setEvent();
    this.loadKeywordHistory();
  }

  setState() {
    this.controller = $(".recent-search-box--controller");
    this.recentSearchKeywordList = $(".recent-search-box__contents__list");
  }

  setEvent() {
    this.controller.addEventListener("mousedown", ({ target }) => {
      this.isButton(target) && this.onController(target.dataset.command);
    });

    this.recentSearchKeywordList.addEventListener("mousedown", ({ target }) => {
      const recentKeyword = target.closest("li");
      this.isButton(target) && this.deleteRecentKeyword(recentKeyword);
    });
  }

  loadKeywordHistory() {
    this.recentSearchBox.inputRecentKeyword(this.keywordStore.recentKeywordArr);
  }

  isButton(target) {
    return target.tagName === "BUTTON" || target.tagName == "I";
  }

  onController(command) {
    if (command === "off") {
      this.keywordStore.flag.recentKeywordSave = 0;
      this.keywordStore.flag.searchBoxFocus = 1;
      this.keywordStore.toggleKeywordSaveCommand(command);
      this.recentSearchBox.showRecentSearchOffAlert();
      this.recentSearchBox.toggleSaveBtn(command);
    } else if (command === "on") {
      this.keywordStore.flag.recentKeywordSave = 1;
      this.keywordStore.toggleKeywordSaveCommand(command);
      this.recentSearchBox.showRecentSearchBox();
      this.recentSearchBox.toggleSaveBtn(command);
    } else if (command === "delete") {
      this.keywordStore.initRecentKeyword();
      this.recentSearchBox.initRecentKeyword();
      this.recentSearchBox.hideRecentSearchBox();
    }
  }

  deleteRecentKeyword(keyword) {
    keyword.remove();
    const Deletedkeyword = keyword.dataset.value;
    this.keywordStore.updateRecentKeyword(Deletedkeyword);
    this.keywordStore.saveLocalStorage();
  }
}
