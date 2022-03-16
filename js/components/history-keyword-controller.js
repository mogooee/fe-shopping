import { $ } from "../utils/utils.js";
const controller = $(".history-keyword--controller");

export class HistoryKeywordController {
  constructor(historyKeyword) {
    this.historyKeyword = historyKeyword;
    this.init();
  }
  init() {
    this.initEventListener();
  }
  initEventListener() {
    controller.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;
      const button = e.target;
      const command = button.dataset.command;
      this.historyKeyword.onController(command, button);
    });
  }
}
