import { $ } from "../utils/utils.js";
import { upKeyCode, downKeyCode } from "../constants.js";

const historyKeywordList = $(".history-keyword--contents__list");

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
    const focuskeywordElement = this.keywordStore.getFocusKeywordElement(changedIndex);
    if (!focuskeywordElement) return;
    this.keywordStore.searchForm(focuskeywordElement);
    this.renderer.onFocusKeyword(focuskeywordElement);
  }

  onController(command, button) {
    if (command === "off") this.renderer.showHistoryOffAlert(button);
    if (command === "on") this.renderer.showHistoryKeyword(button);
    if (command !== "delete") this.keywordStore.toggleSaveCommand(command, button);
    if (command === "delete") {
      this.keywordStore.delete();
      this.renderer.historyKeyword();
      this.renderer.hiddenHistoryKeyword();
    }
  }
}
