import { Component } from "../../core/Component.js";
import { $, debouncing } from "../../utils/utils.js";

export class CategoryMenu extends Component {
  #pos;

  constructor(target, controller) {
    super(target, controller);
    this.#pos = {
      dot1: { x: 0, y: 0 },
      dot2: { x: 0, y: 0 },
      dot3: { x: 0, y: 0 },
    };
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

  getAreaOfTriangle(dot1, dot2, dot3) {
    const l = dot1.x * dot2.y + dot2.x * dot3.y + dot3.x * dot1.y;
    const r = dot2.x * dot1.y + dot3.x * dot2.y + dot1.x * dot3.y;
    return 0.5 * Math.abs(l - r);
  }

  checkTriangleInPoint(dot1Pos, dot2Pos, dot3Pos, checkPos) {
    const basicArea = this.getAreaOfTriangle(dot1Pos, dot2Pos, dot3Pos);
    const dot12 = this.getAreaOfTriangle(dot1Pos, dot2Pos, checkPos);
    const dot13 = this.getAreaOfTriangle(dot1Pos, dot3Pos, checkPos);
    const dot23 = this.getAreaOfTriangle(dot2Pos, dot3Pos, checkPos);

    // 좌표가 설정되지 않은 초기상태
    if (basicArea === 0) return false;
    return dot12 + dot13 + dot23 <= basicArea;
  }

  setTrianglePos({ target }) {
    const nextDepth = target.closest("ul").nextElementSibling;
    if (!nextDepth?.clientWidth) return;
    const { top, bottom, left } = target.getBoundingClientRect();
    const dot1 = { x: left, y: top + (bottom - top) / 2 };
    const dot2 = {
      x: nextDepth.getBoundingClientRect().left,
      y: Array.from(nextDepth.children)[0].getBoundingClientRect().top,
    };
    const dot3 = {
      x: nextDepth.getBoundingClientRect().left,
      y: Array.from(nextDepth.children).at(-1).getBoundingClientRect().bottom,
    };

    this.#pos = { dot1, dot2, dot3 };
    this.controller.dropSubMenu(target.innerText);
  }

  dropSubMenu({ target, clientX, clientY }) {
    const mousePos = { x: clientX, y: clientY };
    if (
      !this.checkTriangleInPoint(
        this.#pos.dot1,
        this.#pos.dot2,
        this.#pos.dot3,
        mousePos
      )
    ) {
      this.controller.dropSubMenu(target.innerText);
    }
  }

  setEvent() {
    const DIAGNOL_MOVEMENT_DELAY = 100;
    const setPos = debouncing(
      this.setTrianglePos.bind(this),
      DIAGNOL_MOVEMENT_DELAY
    );

    this.categoryBtn.addEventListener(
      "mouseover",
      ({ target, clientX, clientY }) => {
        if (target.closest(".category-btn")) {
          this.categoryMenu.classList.remove("hidden");
        }
        if (target.tagName === "LI") {
          setPos({ target, clientX, clientY });
          this.dropSubMenu({ target, clientX, clientY });
        }
      }
    );

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
