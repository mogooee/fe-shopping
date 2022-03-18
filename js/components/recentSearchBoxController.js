import { $ } from "../utils/utils.js";
const controller = $(".recent-search-box--controller");

export class RecentSearchBoxController {
  constructor(searchHelperBox) {
    this.searchHelperBox = searchHelperBox;
    this.init();
  }
  init() {
    this.initEventListener();
  }
  initEventListener() {
    controller.addEventListener("click", ({ target }) => {
      if (target.tagName !== "BUTTON") return;
      this.searchHelperBox.onController(target.dataset.command);
    });
  }
}
