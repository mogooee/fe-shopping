import { $ } from "../utils/utils.js";

const historyKeyword = $(".recent-search-box");
const historyKeywordContents = $(".recent-search-box--contents");
const historyKeywordController = $(".recent-search-box--controller");
const historyKeywordOFF = $(".recent-search-box__off");
const historyKeywordList = $(".recent-search-box--contents__list");

export class Renderer {
  constructor() {}

  showRecentSearchBox(button) {
    historyKeywordOFF.classList.add("hidden");
    historyKeyword.classList.remove("hidden");
    historyKeywordController.classList.remove("hidden");
    historyKeywordContents.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어끄기";
  }

  showRecentSearchOffAlert(button) {
    historyKeywordContents.classList.add("hidden");
    historyKeyword.classList.remove("hidden");
    historyKeywordOFF.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어켜기";
  }

  hideRecentSearchBox() {
    historyKeyword.classList.add("hidden");
  }

  inputRecentKeyword(keyword) {
    const position = "beforeend";
    if (!keyword) {
      historyKeywordList.innerHTML = "";
      return;
    }
    const inputKeyword = keyword.map((keyword) => `<li data-value="${keyword}">${keyword}</li>`).join("");
    historyKeywordList.insertAdjacentHTML(position, inputKeyword);
  }

  removeLastRecentKeyword() {
    const firstKeyword = $(".recent-search-box--contents__list li");
    historyKeywordList.removeChild(firstKeyword);
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
