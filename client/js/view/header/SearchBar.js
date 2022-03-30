import { Component } from "../../core/Component.js";
import { $, $$, isArrowKey, checkArrowUpDown } from "../../utils/utils.js";

export class SearchBar extends Component {
  constructor(target, controller) {
    super(target, controller);
    this.renderKeywordHistoryLocalStorage();
  }

  template() {
    return `<div class="search-box">
              <input class="search-box__input" type="text" placeholder="찾고 싶은 상품을 검색해보세요!" />
              <div class="search-box__btns">
                <button class="search-box__voiceBtn"><i class="fas fa-microphone"></i></button>
                <button class="search-box__searchBtn"><i class="fas fa-search"></i></button>
              </div>
            </div>
            <div class="search-popup hidden">
              <div class="search-popup__contents"></div>
            </div>
            <div class="history__btns hidden">
              <button type="button" class="delete-all-btn" data-command="delete">전체삭제</button>
              <button type="button" class="save-btn" data-command="off">최근검색어끄기</button>
            </div>`;
  }

  getElement() {
    this.searchForm = $(".search-form");
    this.searchBoxInput = $(".search-box__input");
    this.searchPopup = $(".search-popup");
    this.searchPopupContents = $(".search-popup__contents");
    this.historyBtns = $(".history__btns");
  }

  bindController() {
    this.controller.searchBoxInput = this.searchBoxInput;
    this.controller.renderSearchPopup = this.renderSearchPopup.bind(this);
    this.controller.hideSearchPopup = this.hideSearchPopup.bind(this);
    this.controller.updateSearchPopupListLength = this.updateSearchPopupListLength.bind(this);
    this.controller.renderAutoSearch = this.renderAutoSearch.bind(this);
    this.controller.renderRecentSearch = this.renderRecentSearch.bind(this);
    this.controller.renderRecentSearchOff = this.renderRecentSearchOff.bind(this);
    this.controller.toggleRecentSearchOff = this.toggleRecentSearchOff.bind(this);
    this.controller.removeRecentKeyword = this.removeRecentKeyword.bind(this);
    this.controller.removeOverflowKeyword = this.removeOverflowKeyword.bind(this);
    this.controller.focusKeyword = this.focusKeyword.bind(this);
  }

  setEvent() {
    document.addEventListener("click", ({ target }) => {
      if (target.closest(".search-bar") || target.closest(".delete-btn")) return;
      this.controller.outFocusSearchBox();
    });

    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.controller.searchProduct();
    });

    this.searchBoxInput.addEventListener("focus", () => {
      this.controller.onFocusSearchBox();
    });

    this.searchBoxInput.addEventListener("keyup", async ({ key }) => {
      key !== "Enter" && !isArrowKey(key) && this.controller.typeKey();
    });

    this.searchPopupContents.addEventListener("mouseover", ({ target }) => {
      target.tagName === "LI" && this.controller.hoverKeyword(target);
    });

    document.addEventListener("keydown", (e) => {
      !e.isComposing && checkArrowUpDown(e.key) && this.controller.selectKeywordKeyboard(e.key);
    });

    this.searchPopupContents.addEventListener("click", ({ target }) => {
      const recentKeyword = target.closest("li");
      const searchKeyword = target.dataset.value;
      target.closest("button") && this.controller.deleteRecentKeyword(recentKeyword);
      target.tagName === "LI" && this.controller.searchProduct(searchKeyword);
    });

    this.historyBtns.addEventListener("click", ({ target }) => {
      target.tagName === "BUTTON" && this.controller.controlHistoryBtns(target.dataset.command);
    });
  }

  renderKeywordHistoryLocalStorage() {
    this.controller.loadKeywordHistoryLocalStorage();
  }

  renderSearchPopup() {
    this.searchPopup.classList.remove("hidden");
  }

  hideSearchPopup() {
    this.searchPopup.classList.add("hidden");
    this.historyBtns.classList.add("hidden");
  }

  renderRecentSearch(recentKeywords) {
    this.searchPopup.classList.add("recent-search");
    this.searchPopup.classList.remove("hidden");
    this.searchPopup.classList.remove("auto-search");
    this.historyBtns.classList.remove("hidden");
    const recentKeywordsList = recentKeywords.reduce(
      (acc, cur, index) =>
        acc +
        `<li data-index="${index}" data-value="${cur}">
          <span>${cur}</span>
          <button type="button" class="delete-btn">
            <i class="fas fa-times"></i>
          </button>
        </li>`,
      ""
    );
    this.searchPopupContents.innerHTML = `<h5 class="recent-search__title">최근검색어</h3>
                                          <ul class="recent-search__list">${recentKeywordsList}</ul>`;
  }

  renderRecentSearchOff() {
    this.searchPopup.classList.add("recent-search-off");
    this.searchPopup.classList.remove("auto-search");
    this.searchPopup.classList.remove("hidden");
    this.historyBtns.classList.remove("hidden");
    this.searchPopupContents.innerHTML = `<span>최근 검색어 저장 기능이 꺼져 있습니다.</span>`;
  }

  removeOverflowKeyword() {
    const OverflowKeyword = $(".recent-search__list li");
    OverflowKeyword.remove();
  }

  removeRecentKeyword(DeletedKeyword, recentKeywords) {
    DeletedKeyword.remove();
    this.renderRecentSearch(recentKeywords);
  }

  toggleRecentSearchOff(recentKeywords) {
    this.searchPopup.classList.toggle("recent-search-off");
    this.searchPopup.classList.toggle("recent-search");
    $(".save-btn").dataset.command =
      $(".save-btn").dataset.command === "on" //
        ? "off" //
        : "on";
    $(".save-btn").innerText =
      $(".save-btn").innerText === "최근검색어끄기" //
        ? "최근검색어켜기"
        : "최근검색어끄기";
    if (Array.from(this.searchPopup.classList).includes("recent-search-off")) this.renderRecentSearchOff();
    else this.renderRecentSearch(recentKeywords);
  }

  renderAutoSearch(searchKeyword, autoCompletionKeywords) {
    this.searchPopup.classList.add("auto-search");
    this.searchPopup.classList.remove("hidden");
    this.searchPopup.classList.remove("recent-search");
    this.searchPopup.classList.remove("recent-search-off");
    this.historyBtns.classList.add("hidden");
    const autoCompletionList = autoCompletionKeywords.reduce(
      (acc, cur, index) => acc + `<li data-index="${index}" data-value="${cur}">${cur}</li>`,
      ""
    );
    this.searchPopupContents.innerHTML = `<ul class="auto-search__list">${autoCompletionList}</ul>`;
    this.renderAutoCompletionKeyword(searchKeyword);
  }

  renderAutoCompletionKeyword(searchKeyword) {
    const autoCompletionList = $$(".auto-search li");
    autoCompletionList.forEach((e) => {
      e.innerHTML = e.innerHTML.replace(
        new RegExp(searchKeyword),
        "<span style='color:#4285f4'>" + searchKeyword + "</span>"
      );
    });
  }

  focusKeyword(index, device, searchKeyword) {
    const beforeFocusKeywordElement = $(".selected");
    const searchPopupList = Array.from($$(".search-popup li"));
    const focusKeywordElement = searchPopupList[index];
    beforeFocusKeywordElement && beforeFocusKeywordElement.classList.remove("selected");
    let keyword;
    if (focusKeywordElement) {
      focusKeywordElement.classList.add("selected");
      keyword = focusKeywordElement.dataset.value;
    } else {
      keyword = searchKeyword;
    }
    if (device === "keyboard") this.updateSearchBoxInput(keyword);
  }

  updateSearchBoxInput(keyword) {
    this.searchBoxInput.value = keyword;
  }

  updateSearchPopupListLength() {
    return Array.from($$(".search-popup li")).length;
  }
}
