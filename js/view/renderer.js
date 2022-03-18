import { $ } from "../utils/utils.js";

const recentSearchBox = $(".recent-search-box");
const recentSearchBoxContents = $(".recent-search-box__contents");
const recentSearchBoxController = $(".recent-search-box--controller");
const recentKeywordOFF = $(".recent-search-box__off");
const recentKeywordList = $(".recent-search-box__contents__list");
const autoCompletionBox = $(".auto-completion-box");
const deleteBtn = $(".deleteBtn");
const saveBtn = $(".saveBtn");

export class Renderer {
  constructor() {}

  showRecentSearchBox(button) {
    recentKeywordOFF.classList.add("hidden");
    autoCompletionBox.classList.add("hidden");
    recentSearchBox.classList.remove("hidden");
    recentSearchBoxController.classList.remove("hidden");
    recentSearchBoxContents.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어끄기";
  }

  showRecentSearchOffAlert(button) {
    recentSearchBoxContents.classList.add("hidden");
    autoCompletionBox.classList.add("hidden");
    recentSearchBox.classList.remove("hidden");
    recentKeywordOFF.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어켜기";
  }

  showAutoCompletionBox() {
    autoCompletionBox.classList.remove("hidden");
  }

  hideKeywordBox() {
    recentSearchBox.classList.add("hidden");
    autoCompletionBox.classList.add("hidden");
  }

  hideRecentSearchBox() {
    recentSearchBox.classList.add("hidden");
  }

  inputRecentKeyword(keyword) {
    const position = "beforeend";
    const inputKeyword = keyword.map((keyword) => `<li data-value="${keyword}">${keyword}</li>`).join("");
    recentKeywordList.insertAdjacentHTML(position, inputKeyword);
  }

  initRecentKeyword() {
    recentKeywordList.innerHTML = "";
  }

  removeLastRecentKeyword() {
    const firstKeyword = $(".recent-search-box__contents__list li");
    recentKeywordList.removeChild(firstKeyword);
  }

  onFocusKeyword(keywordElement) {
    keywordElement.classList.add("selected-keyword");
  }

  outFocusKeyword() {
    const focusKeywordElement = $(".selected-keyword");
    focusKeywordElement && focusKeywordElement.classList.remove("selected-keyword");
  }

  updateSearchBox(keywordElement) {
    const searchForm = $(".search-box__input-text");
    searchForm.value = keywordElement.dataset.value;
  }

  toggleSaveBtn(command) {
    if (command === "on") saveBtn.innerHTML = "최근검색어끄기";
    else saveBtn.innerHTML = "최근검색어켜기";
  }
}
