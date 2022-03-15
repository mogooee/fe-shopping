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
      this.renderKeyword(e, "on");
    });

    historyKeywordList.addEventListener("mouseout", (e) => {
      this.renderKeyword(e, "out");
    });

    document.addEventListener("keyup", (e) => {
      this.findFocusKeyword(e);
    });
  }

  renderKeyword(e, focus) {
    const keywordElement = e.target;
    if (keywordElement.tagName !== "LI" || keywordElement === undefined) return;
    if (focus === "on") {
      this.rendering.onFocusKeyword(keywordElement);
      this.changeFocusIndex(keywordElement);
      return;
    }
    this.rendering.outFocusKeyword(keywordElement);
    this.outFocusKeyword();
  }

  changeFocusIndex(keywordElement) {
    const historyKeywordList = this.keywordStore.historyKeyword;
    historyKeywordList.forEach((keyword, index) => {
      if (keyword === keywordElement.dataset.value) this.keywordStore.focusIndex = index;
    });
  }

  findFocusKeyword(e) {
    if (e.keyCode !== upKeyCode && e.keyCode !== downKeyCode) return;
    const keyDirection = e.keyCode === upKeyCode ? "up" : "down";
    this.outFocusKeyword();
    this.updateNewFocusKeyword(keyDirection);
  }

  outFocusKeyword() {
    const focusKeywordElement = $(".selected-keyword");
    if (!focusKeywordElement) return;
    this.rendering.outFocusKeyword(focusKeywordElement);
  }

  updateNewFocusKeyword(keyDirection) {
    const changedIndex = this.keywordStore.changeFocusIndex(keyDirection);
    const focuskeywordElement = this.keywordStore.getFocusKeywordElement(changedIndex);
    if (!focuskeywordElement) return;
    this.rendering.onFocusKeyword(focuskeywordElement);
    this.rendering.searchForm(focuskeywordElement);
  }
}
