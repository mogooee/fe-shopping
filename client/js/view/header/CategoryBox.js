import { Component } from "../../core/Component.js";
import { $ } from "../../utils/utils.js";

export class CategoryBox extends Component {
  constructor(target) {
    super(target);
  }

  setState() {
    this.SelectedCategory = $(".category-box p");
  }

  template() {
    return `<p>전체</p>
    <button class="category-box__btn"><i class="fas fa-caret-down"></i></button>`;
  }

  selectCategoryOption(option) {
    this.SelectedCategory.innerHTML = option;
  }
}
