import { Component } from "../../core/Component.js";
import { $ } from "../../utils/utils.js";

export class CategoryMenu extends Component {
  constructor(target, controller) {
    super(target, controller);
  }

  async fetch() {
    this.categoryMenuData = await this.controller.fetchCategoryMenuData();
  }

  template() {
    return `<span class="category-btn__icon"><i class="fas fa-bars"></i></span>
            <span class="category-btn__title">카테고리</span>
            <div class="category-menu hidden">
              <ul class="one-depth">${this.categoryMenuData.reduce(
                (acc, cur) =>
                  acc +
                  `<li>${cur.category}
                  <i class="fas fa-caret-right hidden"></i>
                </li>`,
                ""
              )}</ul>
              <ul class="two-depth hidden"></ul>
              <ul class="third-depth hidden"></ul>
              </div>
            `;
  }

  getElement() {
    this.categoryBtn = $(".category-btn");
    this.categoryMenu = $(".category-menu");
    this.twoDepth = $(".two-depth");
    this.thirdDepth = $(".third-depth");
  }

  bindController() {
    this.controller.categoryMenuData = this.categoryMenuData;
    this.controller.renderSubMenu = this.renderSubMenu.bind(this);
  }

  setEvent() {
    this.categoryBtn.addEventListener("mouseover", ({ target }) => {
      if (target.closest(".category-btn")) this.categoryMenu.classList.remove("hidden");
      target.tagName === "LI" && this.controller.dropSubMenu(target.innerText);
    });

    this.categoryBtn.addEventListener("mouseleave", ({ target }) => {
      target.closest(".category-btn") && this.focusOutCategoryMenu();
    });
  }

  focusOutCategoryMenu() {
    this.categoryMenu.classList.add("hidden");
    this.twoDepth.classList.add("hidden");
    this.thirdDepth.classList.add("hidden");
  }

  renderSubMenu(subCategory, subDepth, categoryImg) {
    if (subDepth > 3) return;
    const renderElement = subDepth === 2 ? this.twoDepth : this.thirdDepth;
    renderElement.innerHTML = subCategory
      ? subCategory.reduce((acc, cur) => acc + `<li>${cur.category}</li>`, "")
      : "";

    if (renderElement === this.twoDepth) {
      this.twoDepth.style.backgroundImage = `url(${categoryImg})`;
      this.twoDepth.classList.remove("hidden");
      this.thirdDepth.classList.add("hidden");
    } else if (renderElement === this.thirdDepth) {
      if (subCategory) this.thirdDepth.classList.remove("hidden");
      else this.thirdDepth.classList.add("hidden");
    }
  }
}
