import { $ } from "../utils/utils.js";

export class Rendering {
  constructor(keywordStore) {
    this.keywordStore = keywordStore;
  }
  historyKeyword(keyword) {
    const position = "beforeend";
    const inputKeyword = keyword.map((keyword) => `<li data-value="${keyword}">${keyword}</li>`).join("");
    const historyKeywordList = $(".history-keyword--contents__list");
    historyKeywordList.insertAdjacentHTML(position, inputKeyword);
  }
  removeFirstKeyword() {
    const historyKeywordList = $(".history-keyword--contents__list");
    const firstKeyword = $(".history-keyword--contents__list li");
    historyKeywordList.removeChild(firstKeyword);
  }
  focusKeyword() {}
}
