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
      key === "Enter" && //
        this.keywordStore.focusBox === "categoryBox" &&
        this.finishSelectingOption();
    });
  }

  openOption(target) {
    if (target.className !== "search-bar") return;
    this.keywordStore.focusBox = "categoryBox";
    this.keywordStore.focusIndex = -1;
    this.categoryOptionBox.showCategoryOptionBox();
  }

  selectOption(target) {
    const selectedOption = target.dataset.value;
    this.keywordStore.focusBox = "";
    this.categoryBox.selectCategoryOption(selectedOption);
    this.categoryOptionBox.hideCategoryOptionBox();
  }

  finishSelectingOption() {
    this.keywordStore.focusBox = "";
    this.categoryOptionBox.hideCategoryOptionBox();
  }
}
