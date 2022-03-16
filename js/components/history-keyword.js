import { $ } from "../utils/utils.js";
import { upKeyCode, downKeyCode } from "../constants.js";

const historyKeywordList = $(".history-keyword--contents__list");

export class HistoryKeyword {
  constructor(keywordStore, rendering) {
    this.keywordStore = keywordStore;
    this.rendering = rendering;
    this.init();
  }
  init() {
    this.initEventListener();
  }
  initEventListener() {
    historyKeywordList.addEventListener("mouseover", (e) => {
      this.checkFocus(e, "on");
    });

    historyKeywordList.addEventListener("mouseout", (e) => {
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
    this.rendering.onFocusKeyword(keywordElement);
  }

  updateFocus(e) {
    if (e.keyCode !== upKeyCode && e.keyCode !== downKeyCode) return;
    const keyDirection = e.keyCode === upKeyCode ? "up" : "down";
    this.outFocusKeyword();
    this.updateFocusKeyword(keyDirection);
  }

  outFocusKeyword() {
    const focusKeywordElement = $(".selected-keyword");
    if (!focusKeywordElement) return;
    this.rendering.outFocusKeyword(focusKeywordElement);
  }

  updateFocusKeyword(keyDirection) {
    const control = "keyboard";
    const changedIndex = this.keywordStore.changeFocusIndex(control, keyDirection);
    const focuskeywordElement = this.keywordStore.getFocusKeywordElement(changedIndex);
    if (!focuskeywordElement) return;
    this.rendering.onFocusKeyword(focuskeywordElement);
    this.rendering.searchForm(focuskeywordElement);
  }
}
