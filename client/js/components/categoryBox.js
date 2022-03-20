import { $ } from "../utils/utils.js";
const searchBar = $(".search-bar");
const categoryOptionList = $(".category-option-box__contents__list");

export class CategoryBox {
  constructor(keywordStore, renderer) {
    this.keywordStore = keywordStore;
    this.renderer = renderer;
    this.init();
  }
  init() {
    this.initEventListeners();
  }
  initEventListeners() {
    searchBar.addEventListener("click", ({ target }) => {
      this.openOption(target);
    });

    categoryOptionList.addEventListener("click", ({ target }) => {
      this.selectOption(target);
    });

    document.addEventListener("keyup", ({ key }) => {
      this.finishSelectingOption(key);
    });
  }
  openOption(target) {
    if (target.className !== "search-bar") return;
    this.keywordStore.flag.categoryBoxFocus = 1;
    this.keywordStore.flag.searchBoxFocus = 0;
    this.keywordStore.focusIndex = -1;
    this.renderer.showCategoryOptionBox();
  }
  selectOption(target) {
    const selectedOption = target.dataset.value;
    this.renderer.selectCategoryOption(selectedOption);
  }
  finishSelectingOption(key) {
    if (!this.keywordStore.flag.categoryBoxFocus || key !== "Enter") return;
    this.keywordStore.flag.categoryBoxFocus = 0;
    this.renderer.hideCategoryOptionBox();
  }
}
