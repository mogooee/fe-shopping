import { $ } from "../../utils/utils.js";
import { fetchData } from "../../utils/utils.js";
import { KeywordStore } from "../../model/KeywordStore.js";
import { CategoryBar } from "./CategoryBar.js";
import { SearchBar } from "./SearchBar.js";
import { CategoryMenu } from "./CategoryMenu.js";
import { CategoryBoxController } from "../../controller/header/CategoryBoxController.js";
import { SearchBarController } from "../../controller/header/SearchBarController.js";
import { CategoryMenuController } from "../../controller/header/CategoryMenuController.js";

export class Header {
  constructor(target) {
    this.target = target;
  }

  async fetch() {
    const data = await fetchData("http://localhost:3000/list/sub-search");
    this.subSearchList = data.map((e) => e.title);
  }

  async render() {
    await this.fetch();
    this.target.innerHTML = this.template();
  }

  template() {
    return `<div class="top-bar">
        <div class="top-bar__menu">
          <ul class="header-menu">
            <li><span>즐겨찾기</span></li>
            <li><span>입점신청 <i class="fas fa-caret-down"></i></span></li>
          </ul>
          <ul class="header-subscribe">
            <li><span>로그인</span></li>
            <li><span>회원가입</span></li>
            <li><span>고객센터</span></li>
          </ul>
        </div>
      </div>
      <div class="header-searchForm">
        <div class="category-btn"></div>
        <div class="header-search-banner">
          <div class="main-search-banner">
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
          </div>
          <div class="sub-search-banner">
            <ul class="sub-search-banner__list">
              ${this.subSearchList.reduce((acc, cur) => acc + `<li><span>${cur}</span></li>`, "")}
            </ul>
          </div>
        </div>
        <ul class="icon-menus">
          <li class="my-coupang">
            <span class="my-coupang__icon"><i class="far fa-user"></i></span>
            <span class="my-coupang__title">마이쿠팡</span>
          </li>
          <li class="my-cart">
            <span class="my-cart__icon"><i class="fas fa-shopping-cart"></i></span>
            <span class="my-cart__title">장바구니</span>
          </li>
        </ul>
      </div>`;
  }

  mount() {
    const keywordStore = new KeywordStore();

    const categoryBoxController = new CategoryBoxController(keywordStore);
    const searchBarController = new SearchBarController(keywordStore);
    const categoryMenuController = new CategoryMenuController(keywordStore);

    const categoryBar = new CategoryBar($(".category-bar"), categoryBoxController);
    const searchBar = new SearchBar($(".search-bar"), searchBarController);
    const categoryMenu = new CategoryMenu($(".category-btn"), categoryMenuController);
  }
}
