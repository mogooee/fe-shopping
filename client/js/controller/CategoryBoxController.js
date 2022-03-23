import { $ } from "../utils/utils.js";

export class CategoryBoxController {
  constructor(keywordStore, categoryBox, categoryOptionBox) {
    this.keywordStore = keywordStore;
    this.categoryBox = categoryBox;
    this.categoryOptionBox = categoryOptionBox;
    this.setState();
    this.setEvent();
  }

  setState() {
    this.searchBar = $(".search-bar");
    this.categoryOptionList = $(".category-option-box__contents__list");
  }

  setEvent() {
    this.searchBar.addEventListener("click", ({ target }) => {
      this.openOption(target);
    });

    this.categoryOptionList.addEventListener("click", ({ target }) => {
      this.selectOption(target);
    });

    document.addEventListener("keyup", ({ key }) => {
      if (key === "Enter" && this.keywordStore.flag.categoryBoxFocus) this.finishSelectingOption();
    });
  }

  openOption(target) {
    if (target.className !== "search-bar") return;
    this.keywordStore.flag.categoryBoxFocus = 1;
    this.keywordStore.flag.searchBoxFocus = 0;
    this.keywordStore.focusIndex = -1;
    this.categoryOptionBox.showCategoryOptionBox();
  }

  selectOption(target) {
    const selectedOption = target.dataset.value;
    this.categoryBox.selectCategoryOption(selectedOption);
    this.categoryOptionBox.hideCategoryOptionBox();
  }

  finishSelectingOption() {
    if (!this.keywordStore.flag.categoryBoxFocus) return;
    this.keywordStore.flag.categoryBoxFocus = 0;
    this.categoryOptionBox.hideCategoryOptionBox();
  }
}
