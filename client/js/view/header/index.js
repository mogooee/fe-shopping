import { $ } from "../../utils/utils.js";
import { KeywordStore } from "../../model/KeywordStore.js";
import { CategoryBar } from "./CategoryBar.js";
import { SearchBar } from "./SearchBar.js";
import { CategoryBarController } from "../../controller/CategoryBarController.js";
import { SearchBarController } from "../../controller/SearchBarController.js";

export class Header {
  constructor(target) {
    this.target = target;
  }

  render() {
    this.target.innerHTML = this.template();
  }

  template() {
    return `<div class="header-searchForm">
              <h1 class="page-title">
              <img
               src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png"
               alt="coupang-logo"
              />
              </h1>
              <div class="search-banner">
                <form class="search-form">
                  <div class="category-bar"></div>
                  <div class="search-bar"></div>
                </form>
              </div>
            </div>`;
  }

  mount() {
    const keywordStore = new KeywordStore();

    const categoryBarController = new CategoryBarController(keywordStore);
    const searchBarController = new SearchBarController(keywordStore);

    const categoryBar = new CategoryBar($(".category-bar"), categoryBarController);
    const searchBar = new SearchBar($(".search-bar"), searchBarController);
  }
}
