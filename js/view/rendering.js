import { $ } from "../utils/utils.js";

const historyKeyword = $(".history-keyword");
const historyKeywordContents = $(".history-keyword--contents");
const historyKeywordController = $(".history-keyword--controller");
const historyKeywordOFF = $(".history-keyword__off");
const historyKeywordList = $(".history-keyword--contents__list");

export class Rendering {
  constructor() {}

  showHistoryKeyword(button) {
    historyKeywordOFF.classList.add("hidden");
    historyKeyword.classList.remove("hidden");
    historyKeywordController.classList.remove("hidden");
    historyKeywordContents.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어끄기";
  }

  showHistoryOffAlert(button) {
    historyKeywordContents.classList.add("hidden");
    historyKeywordOFF.classList.remove("hidden");
    if (button) button.innerHTML = "최근검색어켜기";
  }

  hiddenHistoryKeyword() {
    //historyKeyword.classList.add("hidden");
  }

  historyKeyword(keyword) {
    const position = "beforeend";
    if (!keyword) {
      historyKeywordList.innerHTML = "";
      return;
    }
    const inputKeyword = keyword.map((keyword) => `<li data-value="${keyword}">${keyword}</li>`).join("");
    historyKeywordList.insertAdjacentHTML(position, inputKeyword);
  }

  removeFirstKeyword() {
    const firstKeyword = $(".history-keyword--contents__list li");
    historyKeywordList.removeChild(firstKeyword);
  }

  onFocusKeyword(keywordElement) {
    keywordElement.classList.add("selected-keyword");
  }

  outFocusKeyword(keywordElement) {
    keywordElement.classList.remove("selected-keyword");
  }
}
