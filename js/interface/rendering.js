import { $ } from "../utils/utils.js";

const historyKeyword = $(".history-keyword");
const historyKeywordList = $(".history-keyword--contents__list");

export class Rendering {
  constructor() {}

  showHistoryKeyword() {
    historyKeyword.classList.remove("hidden");
  }

  hiddenHistoryKeyword() {
    historyKeyword.classList.add("hidden");
  }

  historyKeyword(keyword) {
    const position = "beforeend";
    const inputKeyword = keyword.map((keyword) => `<li data-value="${keyword}">${keyword}</li>`).join("");
    historyKeywordList.insertAdjacentHTML(position, inputKeyword);
  }

  removeFirstKeyword() {
    const firstKeyword = $(".history-keyword--contents__list li");
    historyKeywordList.removeChild(firstKeyword);
  }

  onFocusKeyword(keywordElement) {
    if (keywordElement) keywordElement.classList.add("selected-keyword");
  }

  outFocusKeyword(keywordElement) {
    if (keywordElement) keywordElement.classList.remove("selected-keyword");
  }

  searchForm(keywordElement) {
    const searchForm = $(".search-keyword__input-text");
    searchForm.value = keywordElement.dataset.value;
  }
}
