import { $ } from "../utils/utils.js";
import { upKey, downKey } from "../constants/constants.js";

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

    document.addEventListener("keyup", ({ key }) => {
      this.isArrowKey(key) && this.checkOpenBox() && this.updateFocusIndex(key);
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

  isArrowKey(key) {
    return key === upKey || key === downKey;
  }

  decideFocusBox() {
    if (this.keywordStore.flag.categoryBoxFocus) return "category";
    if (this.keywordStore.flag.autoCompletion) return "autoCompletion";
    else return "recentSearch";
  }

  checkOpenBox() {
    return this.keywordStore.flag.searchBoxFocus || this.keywordStore.flag.categoryBoxFocus;
  }

  updateFocusIndex(ArrowKey) {
    if (!this.keywordStore.flag.searchBoxFocus && !this.keywordStore.flag.categoryBoxFocus) return;
    this.renderer.outFocusKeyword();
    this.updateFocusKeyword(ArrowKey);
  }

  updateFocusKeyword(ArrowKey) {
    const box = this.decideFocusBox();
    const control = "keyboard";
    const changedIndex = this.keywordStore.changeFocusIndex(control, ArrowKey, box);
    const focuskeywordElement = this.keywordStore.getFocusedKeywordElement(changedIndex, box);
    if (!focuskeywordElement) return;
    this.renderer.updateSearchBox(focuskeywordElement, box);
    this.renderer.onFocusKeyword(focuskeywordElement);
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
