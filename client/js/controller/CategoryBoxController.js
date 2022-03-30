export class CategoryBoxController {
  constructor(keywordStore) {
    this.keywordStore = keywordStore;
  }

  outFocusCategoryBox() {
    this.hideCategoryOption();
  }

  toggleOptionBox() {
    this.keywordStore.focusCategoryBox({ AFTER_FN: this.toggleCategoryOptionBox });
  }

  selectOptionMouse(target) {
    const selectedOption = target.dataset.value;
    this.showCategoryOption(selectedOption);
    this.outFocusCategoryBox();
  }

  selectOptionKeyboard(arrowKey) {
    if (this.keywordStore.focusBox !== "categoryBox") return;
    const boxLength = Array.from(this.categoryList).length;
    this.keywordStore.updateKeyboardFocusIndex(arrowKey, boxLength, {
      AFTER_FN: this.focusCategory,
    });
    this.scrollCategory(arrowKey);
  }

  scrollCategory(ArrowKey) {
    if (this.keywordStore.focusIndex === 0) this.initScroll();
    this.scrollUpDown(ArrowKey);
  }

  hoverOption(target) {
    this.keywordStore.updateMouseFocusIndex(target.dataset.index, { AFTER_FN: this.focusCategory });
  }

  finishSelectingOption() {
    if (this.keywordStore.focusBox === "categoryBox") this.keywordStore.focusBox = "";
  }
}
