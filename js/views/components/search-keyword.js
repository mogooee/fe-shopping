import { $ } from "../../utils/utils.js";

const form = $(".search-keyword__input");
const input = $(".search-keyword__input-text");

export class SearchKeyword {
  constructor(historyKeyword) {
    this.historyKeyword = historyKeyword;
    this.init();
  }
  init() {
    this.initEventListeners();
  }
  initEventListeners() {
    input.addEventListener("focus", (e) => {
      $(".history-keyword").classList.remove("hidden");
    });
    input.addEventListener("blur", (e) => {
      $(".history-keyword").classList.add("hidden");
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!input.value.trim().length) return;
      this.historyKeyword.saveKeyword(input.value);
      this.historyKeyword.saveLocalStorage();
      this.historyKeyword.render([input.value]);
      input.value = "";
    });
  }
}
