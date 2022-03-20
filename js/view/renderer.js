import { $ } from "../utils/utils.js";
import { downKey } from "../constants/constants.js";

const recentSearchBox = $(".recent-search-box");
const recentSearchBoxContents = $(".recent-search-box__contents");
const recentSearchBoxController = $(".recent-search-box--controller");
const recentKeywordOFF = $(".recent-search-box__off");
const recentKeywordList = $(".recent-search-box__contents__list");
const autoCompletionBox = $(".auto-completion-box");
const categoryOptionBox = $(".category-option-box");
const categoryOption = $(".category-option-box");
const searchCategoryBoxBtn = $(".search-category-box__btn");

export class Renderer {
  constructor() {}

  showRecentSearchBox(button) {
    recentKeywordOFF.classList.add("hidden");
    autoCompletionBox.classList.add("hidden");
    categoryOptionBox.classList.add("hidden");
    recentSearchBox.classList.remove("hidden");
    recentSearchBoxController.classList.remove("hidden");
    recentSearchBoxContents.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어끄기";
    searchCategoryBoxBtn.innerHTML = `<i class="fas fa-caret-down"></i>`;
  }

  showRecentSearchOffAlert(button) {
    recentSearchBoxContents.classList.add("hidden");
    autoCompletionBox.classList.add("hidden");
    categoryOptionBox.classList.add("hidden");
    recentSearchBox.classList.remove("hidden");
    recentKeywordOFF.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어켜기";
  }

  showAutoCompletionBox(keywordArr) {
    categoryOptionBox.classList.add("hidden");
    autoCompletionBox.classList.remove("hidden");
    const autoCompletionBoxList = $(".auto-completion-box__contents__list");
    if (keywordArr)
      autoCompletionBoxList.innerHTML = keywordArr.reduce(
        (acc, cur) => acc + `<li data-value="${cur}">${cur}</li>`,
        ""
      );
  }

  showCategoryOptionBox() {
    categoryOptionBox.classList.toggle("hidden");
    recentSearchBox.classList.add("hidden");
    autoCompletionBox.classList.add("hidden");
    const isHidden = categoryOption.className.split(" ").includes("hidden");
    searchCategoryBoxBtn.innerHTML = `<i class="fas fa-caret-${isHidden ? "down" : "up"}"></i>`;
  }

  hideKeywordBox() {
    recentSearchBox.classList.add("hidden");
    autoCompletionBox.classList.add("hidden");
    categoryOptionBox.classList.add("hidden");
    searchCategoryBoxBtn.innerHTML = `<i class="fas fa-caret-down"></i>`;
  }

  hideRecentSearchBox() {
    recentSearchBox.classList.add("hidden");
  }

  hideCategoryOptionBox() {
    categoryOptionBox.classList.add("hidden");
  }

  inputRecentKeyword(keyword) {
    const position = "beforeend";
    const inputKeyword = keyword
      .map(
        (keyword) =>
          `<li data-value="${keyword}">${keyword}<button class="recent-keyword__delete-btn"><i class="fas fa-times"></i></button></li>`
      )
      .join("");
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

  onfocusAutoCompletionKeyword(inputKeyword) {
    const autoCompletionKeywordList = autoCompletionBox.querySelectorAll("li");
    autoCompletionKeywordList.forEach((e) => {
      e.innerHTML = e.innerHTML.replace(
        new RegExp(inputKeyword),
        "<span style='color:#4285f4'>" + inputKeyword + "</span>"
      );
    });
  }

  outFocusKeyword() {
    const focusKeywordElement = $(".selected-keyword");
    focusKeywordElement && focusKeywordElement.classList.remove("selected-keyword");
  }

  updateSearchBox(keywordElement, box) {
    const value = keywordElement.dataset.value;
    if (box === "category") {
      const SelectedCategory = $(".search-category-box p");
      SelectedCategory.innerHTML = value;
      return;
    }
    const searchForm = $(".search-box__input-text");
    searchForm.value = value;
  }

  toggleSaveBtn(command) {
    const saveBtn = $(".saveBtn");
    if (command === "on") saveBtn.innerHTML = "최근검색어끄기";
    else saveBtn.innerHTML = "최근검색어켜기";
  }

  selectCategoryOption(option) {
    const SelectedCategory = $(".search-category-box p");
    SelectedCategory.innerHTML = option;
  }

  initScrollCategory() {
    categoryOption.scrollTo(0, 0);
  }

  scrollCategory(ArrowKey) {
    categoryOption.scrollBy(0, ArrowKey === downKey ? 10 : -10);
  }
}
