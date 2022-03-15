import { SearchKeyword } from "./components/search-keyword.js";
import { HistoryKeyword } from "./components/history-keyword.js";
import { KeywordStore } from "./interface/keywordStore.js";
import { Rendering } from "./interface/rendering.js";

const main = () => {
  const rendering = new Rendering();
  const keywordStore = new KeywordStore(rendering);
  const searchKeyword = new SearchKeyword(keywordStore);
  const historyKeyword = new HistoryKeyword(keywordStore);
};

main();
