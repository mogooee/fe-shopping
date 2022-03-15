export class HistoryKeyword {
  constructor(keywordStore) {
    this.keywordStore = keywordStore;
    this.init();
  }
  init() {
    this.loadLocalStorage();
  }
  loadLocalStorage() {
    const loadHistoryKeyword = localStorage.getItem("search-keyword");
    if (loadHistoryKeyword) {
      const parsedHistoryKeyword = JSON.parse(loadHistoryKeyword);
      this.keywordStore.loadHistoryKeyword(parsedHistoryKeyword);
    }
  }
}
