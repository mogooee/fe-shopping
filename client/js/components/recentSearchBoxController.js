import { $ } from "../utils/utils.js";

const recentSearchKeywordList = $(".recent-search-box__contents__list");

export class RecentSearchBoxController {
  constructor(searchHelperBox) {
    this.searchHelperBox = searchHelperBox;
    this.controller = $(".recent-search-box--controller");
    this.init();
  }
  init() {
    this.initEventListener();
  }
  initEventListener() {
    this.controller.addEventListener("click", ({ target }) => {
      this.isButton(target) && this.searchHelperBox.onController(target.dataset.command);
    });

    recentSearchKeywordList.addEventListener("click", ({ target }) => {
      const recentKeyword = target.closest("li");
      this.isButton(target) && this.searchHelperBox.deleteRecentKeyword(recentKeyword);
    });
  }

  isButton(target) {
    return target.tagName === "BUTTON" || target.tagName == "I";
  }
}
