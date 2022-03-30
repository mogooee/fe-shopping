import { Component } from "../../core/Component.js";
import { $, $$, checkArrowUpDown } from "../../utils/utils.js";
import { categoryOptions, downKey } from "../../constants/constants.js";

export class CategoryBar extends Component {
  constructor(target, controller) {
    super(target, controller);
  }

  template() {
    return `<div class="category-box">
              <p>전체</p>
              <button type="button"><i class="fas fa-caret-down"></i></button>
            </div>
            <div class="category-option-box hidden">
              <div class="category-option-box__contents">
                <ul class="category-option-box__contents__list">
                  ${categoryOptions.reduce(
                    (acc, cur, index) => acc + `<li data-value="${cur}" data-index="${index}">${cur}</li>`,
                    ""
                  )}
                </ul>
              </div>
            </div>`;
  }

  getElement() {
    this.categoryBox = $(".category-box");
    this.categoryBoxBtn = $(".category-box button");
    this.categoryOptionBox = $(".category-option-box");
    this.selectedCategory = $(".category-box p");
    this.categoryList = $$(".category-option-box li");
  }

  bindController() {
    this.controller.categoryList = this.categoryList;
    this.controller.toggleCategoryOptionBox = this.toggleCategoryOptionBox.bind(this);
    this.controller.showCategoryOption = this.showCategoryOption.bind(this);
    this.controller.focusCategory = this.focusCategory.bind(this);
    this.controller.hideCategoryOption = this.hideCategoryOption.bind(this);
    this.controller.initScroll = this.initScroll.bind(this);
    this.controller.scrollUpDown = this.scrollUpDown.bind(this);
  }

  setEvent() {
    document.addEventListener("click", ({ target }) => {
      if (target.closest(".category-bar")) return;
      this.controller.outFocusCategoryBox();
    });

    this.categoryBox.addEventListener("click", () => {
      this.controller.toggleOptionBox();
    });

    this.categoryOptionBox.addEventListener("click", ({ target }) => {
      target.tagName === "LI" && this.controller.selectOptionMouse(target);
    });

    this.categoryOptionBox.addEventListener("mouseover", ({ target }) => {
      target.tagName === "LI" && this.controller.hoverOption(target);
    });

    document.addEventListener("keydown", ({ key }) => {
      checkArrowUpDown(key) && this.controller.selectOptionKeyboard(key);
      key === "Enter" && this.controller.outFocusCategoryBox();
    });
  }

  showCategoryOption(option) {
    this.selectedCategory.innerHTML = option;
    this.categoryOptionBox.classList.toggle("hidden");
  }

  hideCategoryOption() {
    this.categoryOptionBox.classList.add("hidden");
    this.categoryBoxBtn.innerHTML = `<i class="fas fa-caret-down"></i>`;
  }

  toggleCategoryOptionBox() {
    this.categoryOptionBox.classList.toggle("hidden");
    const isHidden = this.categoryOptionBox.className.split(" ").includes("hidden");
    this.categoryBoxBtn.innerHTML = `<i class="fas fa-caret-${isHidden ? "down" : "up"}"></i>`;
  }

  focusCategory(index) {
    const beforeFocusKeywordElement = $(".selected");
    const focusCategoryElement = this.categoryList[index];
    beforeFocusKeywordElement && beforeFocusKeywordElement.classList.remove("selected");
    if (!focusCategoryElement) return;
    focusCategoryElement.classList.add("selected");
    this.selectedCategory.innerHTML = focusCategoryElement.innerText;
  }

  initScroll() {
    this.categoryOptionBox.scrollTo(0, 0);
  }

  scrollUpDown(ArrowKey) {
    this.categoryOptionBox.scrollBy(0, ArrowKey === downKey ? 10 : -10);
  }
}
