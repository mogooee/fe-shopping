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
    controller.addEventListener("click", ({ target }) => {
      if (target.tagName !== "BUTTON") return;
      this.recentSearchBox.onController(target.dataset.command);
    });
  }
}
