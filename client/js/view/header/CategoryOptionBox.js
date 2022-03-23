import { Component } from "../../core/Component.js";
import { categoryOptions } from "../../constants/constants.js";
import { $ } from "../../utils/utils.js";
import { downKey } from "../../constants/constants.js";

export class CategoryOptionBox extends Component {
  constructor(target) {
    super(target);
  }

  setState() {
    this.categoryOptionBox = $(".category-option-box");
    this.searchCategoryBoxBtn = $(".category-box__btn");
  }

  template() {
    const optionList = categoryOptions.reduce(
      (acc, cur, index) => acc + `<li data-value="${cur}" data-index="${index}">${cur}</li>`,
      ""
    );
    return `<div class="category-option-box__contents">
      <ul class="category-option-box__contents__list">
       ${optionList}
      </ul>
    </div>`;
  }

  showCategoryOptionBox() {
    const isHidden = this.categoryOptionBox.className.split(" ").includes("hidden");
    this.categoryOptionBox.classList.toggle("hidden");
    this.searchCategoryBoxBtn.innerHTML = `<i class="fas fa-caret-${isHidden ? "down" : "up"}"></i>`;
  }

  hideCategoryOptionBox() {
    this.categoryOptionBox.classList.add("hidden");
    this.searchCategoryBoxBtn.innerHTML = `<i class="fas fa-caret-down"></i>`;
  }

  initScrollCategory() {
    this.categoryOptionBox.scrollTo(0, 0);
  }

  scrollCategory(ArrowKey) {
    this.categoryOptionBox.scrollBy(0, ArrowKey === downKey ? 10 : -10);
  }
}
