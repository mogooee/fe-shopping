import { $ } from "../utils/utils.js";

const form = $(".search-keyword__input");
const input = $(".search-keyword__input-text");

export class SearchKeyword {
  constructor(keywordStore) {
    this.keywordStore = keywordStore;
    this.init();
  }
  init() {
    this.initEventListeners();
  }
  initEventListeners() {
    //focus되면 최근검색어창 렌더링
    input.addEventListener("focus", (e) => {
      $(".history-keyword").classList.remove("hidden");
    });
    input.addEventListener("blur", (e) => {
      $(".history-keyword").classList.add("hidden");
    });
    //keyword를 입력하면
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!input.value.trim().length) return;
      //keywordStore에 keyword를 저장한다.
      this.keywordStore.addKeyword(input.value);
      input.value = "";
    });
  }
}
