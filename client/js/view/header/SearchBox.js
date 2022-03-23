import { Component } from "../../core/Component.js";
import { $ } from "../../utils/utils.js";

export class SearchBox extends Component {
  constructor(target) {
    super(target);
  }

  setState() {
    this.searchForm = $(".search-box__input-text");
  }

  template() {
    return `<form class="search-box__input">
        <input
          class="search-box__input-text"
          type="text"
          placeholder="찾고 싶은 상품을 검색해보세요!"
        />
      </form>
      <button class="search-box__voice"><i class="fas fa-microphone"></i></button>
      <button class="search-box__btn"><i class="fas fa-search"></i></button>`;
  }

  updateSearchBox(keywordElement, box) {
    const value = keywordElement.dataset.value;
    if (box === "category") {
      const SelectedCategory = $(".category-box p");
      SelectedCategory.innerHTML = value;
      return;
    }
    this.searchForm.value = value;
  }
}
