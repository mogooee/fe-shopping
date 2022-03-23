import { Component } from "../../core/Component.js";
import { $ } from "../../utils/utils.js";

export class RecentSearchBox extends Component {
  constructor(target) {
    super(target);
  }

  setState() {
    this.recentSearchBox = $(".recent-search-box");
    this.recentSearchBoxContents = $(".recent-search-box__contents");
    this.recentKeywordList = $(".recent-search-box__contents__list");
    this.recentSearchBoxController = $(".recent-search-box--controller");
    this.recentKeywordOFF = $(".recent-search-box__off");
  }

  template() {
    return `<div class="recent-search-box__contents hidden">
            <p class="recent-search-box__contents__title">최근 검색어</p>
            <div class="recent-search-box__contents__keywords">
            <ul class="recent-search-box__contents__list"></ul>
            </div>
            </div>
            <div class="recent-search-box__off hidden">
            <p>최근 검색어 저장 기능이 꺼져 있습니다.</p>
            </div>
            <div class="recent-search-box--controller hidden">
            <button class="deleteBtn" data-command="delete">전체삭제</button>
            <button class="saveBtn" data-command="off">최근검색어끄기</button>
            </div>`;
  }

  showRecentSearchBox(button) {
    this.recentKeywordOFF.classList.add("hidden");
    this.recentSearchBox.classList.remove("hidden");
    this.recentSearchBoxController.classList.remove("hidden");
    this.recentSearchBoxContents.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어끄기";

    const searchCategoryBoxBtn = $(".category-box__btn");
    searchCategoryBoxBtn.innerHTML = `<i class="fas fa-caret-down"></i>`;
  }

  hideRecentSearchBox() {
    this.recentSearchBox.classList.add("hidden");
  }

  showRecentSearchOffAlert(button) {
    this.recentSearchBoxContents.classList.add("hidden");
    this.recentSearchBox.classList.remove("hidden");
    this.recentKeywordOFF.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어켜기";
  }

  initRecentKeyword() {
    this.recentKeywordList.innerHTML = "";
  }

  toggleSaveBtn(command) {
    const saveBtn = $(".saveBtn");
    if (command === "on") saveBtn.innerHTML = "최근검색어끄기";
    else saveBtn.innerHTML = "최근검색어켜기";
  }

  removeOverflowKeyword() {
    const OverflowKeyword = $(".recent-search-box__contents__list li");
    this.recentKeywordList.removeChild(OverflowKeyword);
  }

  inputRecentKeyword(keyword) {
    let index = 0;
    const position = "beforeend";
    const inputKeyword = keyword
      .map(
        (keyword) =>
          `<li data-value="${keyword}" data-index="${index++}">${keyword}<button class="recent-keyword__delete-btn"><i class="fas fa-times"></i></button></li>`
      )
      .join("");
    this.initRecentKeyword();
    this.recentKeywordList.insertAdjacentHTML(position, inputKeyword);
  }
}
