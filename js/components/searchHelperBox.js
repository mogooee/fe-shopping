import { $ } from "../utils/utils.js";

const searchHelperBox = $(".search-helper-box");

export class SearchHelperBox {
  constructor(keywordStore, renderer) {
    this.keywordStore = keywordStore;
    this.renderer = renderer;
    this.init();
  }
  init() {
    this.initEventListener();
  }
  initEventListener() {
    searchHelperBox.addEventListener("mouseover", ({ target }) => {
      this.checkFocus(target, "on");
    });

    searchHelperBox.addEventListener("mouseout", ({ target }) => {
      this.checkFocus(target, "out");
    });
  }

  checkFocus(keywordElement, focus) {
    if (!this.isKeywordList(keywordElement)) return;
    this.renderer.outFocusKeyword();
    if (focus === "on") this.onFocusKeyword(keywordElement);
  }

  isKeywordList(keywordElement) {
    return keywordElement.tagName === "LI";
  }

  onFocusKeyword(keywordElement) {
    const control = "mouse";
    const box = this.decideFocusBox();
    this.keywordStore.changeFocusIndex(control, keywordElement, box);
    this.renderer.onFocusKeyword(keywordElement);
  }

  decideFocusBox() {
    return this.keywordStore.flag.autoCompletion ? "autoCompletion" : "recentSearch";
  }

  onController(command) {
    if (command === "off") {
      this.keywordStore.flag.recentKeywordSave = 0;
      this.keywordStore.flag.searchBoxFocus = 1;
      this.keywordStore.toggleKeywordSaveCommand(command);
      this.renderer.showRecentSearchOffAlert();
      this.renderer.toggleSaveBtn(command);
    }
    if (command === "on") {
      this.keywordStore.flag.recentKeywordSave = 1;
      this.keywordStore.toggleKeywordSaveCommand(command);
      this.renderer.showRecentSearchBox();
      this.renderer.toggleSaveBtn(command);
    }
    if (command === "delete") {
      this.keywordStore.initRecentKeyword();
      this.renderer.initRecentKeyword();
      this.renderer.hideRecentSearchBox();
    }
  }
}
