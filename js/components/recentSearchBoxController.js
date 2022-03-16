import { $ } from "../utils/utils.js";
const controller = $(".recent-search-box--controller");

export class RecentSearchBoxController {
  constructor(recentSearchBox) {
    this.recentSearchBox = recentSearchBox;
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
      this.recentSearchBox.onController(command, button);
    });
  }
}
