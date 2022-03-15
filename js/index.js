import { SearchKeyword } from "./views/components/search-keyword.js";
import { HistoryKeyword } from "./views/components/history-keyword.js";

const main = () => {
  const searchKeyword = new SearchKeyword(new HistoryKeyword());
};

main();
