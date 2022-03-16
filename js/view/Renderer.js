import { $ } from "../utils/utils.js";

const recentKeyword = $(".recent-search-box");
const recentKeywordContents = $(".recent-search-box--contents");
const recentKeywordController = $(".recent-search-box--controller");
const recentKeywordOFF = $(".recent-search-box__off");
const recentKeywordList = $(".recent-search-box--contents__list");

export class Renderer {
  constructor() {}

  showRecentSearchBox(button) {
    recentKeywordOFF.classList.add("hidden");
    recentKeyword.classList.remove("hidden");
    recentKeywordController.classList.remove("hidden");
    recentKeywordContents.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어끄기";
  }

  showRecentSearchOffAlert(button) {
    recentKeywordContents.classList.add("hidden");
    recentKeyword.classList.remove("hidden");
    recentKeywordOFF.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어켜기";
  }

  hideRecentSearchBox() {
    recentKeyword.classList.add("hidden");
  }

  inputRecentKeyword(keyword) {
    const position = "beforeend";
    if (!keyword) {
      recentKeywordList.innerHTML = "";
      return;
    }
    const inputKeyword = keyword.map((keyword) => `<li data-value="${keyword}">${keyword}</li>`).join("");
    recentKeywordList.insertAdjacentHTML(position, inputKeyword);
  }

  removeLastRecentKeyword() {
    const firstKeyword = $(".recent-search-box--contents__list li");
    recentKeywordList.removeChild(firstKeyword);
  }

  onFocusKeyword(keywordElement) {
    keywordElement.classList.add("selected-keyword");
  }

  outFocusKeyword(keywordElement) {
    keywordElement.classList.remove("selected-keyword");
  }

  updateSearchBox(keywordElement) {
    const searchForm = $(".search-box__input-text");
    searchForm.value = keywordElement.dataset.value;
  }
}
