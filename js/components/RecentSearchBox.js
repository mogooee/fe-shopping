import { $ } from "../utils/utils.js";
import { upKeyCode, downKeyCode } from "../constants.js";

const recentKeywordList = $(".recent-search-box--contents__list");

export class RecentSearchBox {
  constructor(keywordStore, renderer) {
    this.keywordStore = keywordStore;
    this.renderer = renderer;
    this.init();
  }
  init() {
    this.initEventListener();
  }
  initEventListener() {
    recentKeywordList.addEventListener("mouseover", (e) => {
      this.checkFocus(e, "on");
    });

    recentKeywordList.addEventListener("mouseout", (e) => {
      this.checkFocus(e, "out");
    });

    document.addEventListener("keyup", (e) => {
      this.updateFocus(e);
    });
  }

  checkFocus(e, focus) {
    const keywordElement = e.target;
    if (keywordElement.tagName !== "LI" || keywordElement === undefined) return;
    this.outFocusKeyword();
    if (focus === "on") this.onMouseKeyword(keywordElement);
  }

  onMouseKeyword(keywordElement) {
    const control = "mouse";
    this.keywordStore.changeFocusIndex(control, keywordElement);
    this.renderer.onFocusKeyword(keywordElement);
  }

  updateFocus(e) {
    if (e.keyCode !== upKeyCode && e.keyCode !== downKeyCode) return;
    const keyDirection = e.keyCode === upKeyCode ? "up" : "down";
    this.outFocusKeyword();
    this.updateFocusKeyword(keyDirection);
  }

  outFocusKeyword() {
    const focusKeywordElement = $(".selected-keyword");
    focusKeywordElement && this.renderer.outFocusKeyword(focusKeywordElement);
  }

  updateFocusKeyword(keyDirection) {
    const control = "keyboard";
    const changedIndex = this.keywordStore.changeFocusIndex(control, keyDirection);
    const focuskeywordElement = this.keywordStore.getFocusedKeywordElement(changedIndex);
    if (!focuskeywordElement) return;
    this.renderer.updateSearchBox(focuskeywordElement);
    this.renderer.onFocusKeyword(focuskeywordElement);
  }

  onController(command, button) {
    if (command === "off") {
      this.keywordStore.recentKeywordSaveFlag = 0;
      this.renderer.showRecentSearchOffAlert(button);
    }
    if (command === "on") {
      this.keywordStore.recentKeywordSaveFlag = 1;
      this.renderer.showRecentSearchBox(button);
    }
    if (command !== "delete") this.keywordStore.toggleKeywordSaveCommand(command, button);
    if (command === "delete") {
      this.keywordStore.initRecentKeyword();
      this.renderer.inputRecentKeyword();
      this.renderer.hideRecentSearchBox();
    }
  }
}
