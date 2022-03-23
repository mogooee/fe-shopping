import { $ } from "../../utils/utils.js";

import { KeywordStore } from "../../model/KeywordStore.js";
import { SearchBoxController } from "../../controller/SearchBoxController.js";
import { SearchHelperController } from "../../controller/SearchHelperController.js";
import { RecentSearchBoxController } from "../../controller/RecentSearchBoxController.js";
import { CategoryBoxController } from "../../controller/CategoryBoxController.js";
import { SearchBox } from "./SearchBox.js";
import { RecentSearchBox } from "./RecentSearchBox.js";
import { CategoryBox } from "./CategoryBox.js";
import { CategoryOptionBox } from "./CategoryOptionBox.js";
import { AutoCompletionBox } from "./AutoCompletionBox.js";

export const Header = function () {
  this.initModel();
  this.initView();
  this.initController();
};

Header.prototype.initModel = function () {
  this.keywordStore = new KeywordStore();
};

Header.prototype.initView = function () {
  this.searchBox = new SearchBox($(".search-box"));
  this.recentSearchBox = new RecentSearchBox($(".recent-search-box"));
  this.categoryBox = new CategoryBox($(".category-box"));
  this.categoryOptionBox = new CategoryOptionBox($(".category-option-box"));
  this.autoCompletionBox = new AutoCompletionBox($(".auto-completion-box"));
};

Header.prototype.initController = function () {
  this.searchBoxController = new SearchBoxController(
    this.keywordStore,
    this.recentSearchBox,
    this.categoryOptionBox,
    this.autoCompletionBox
  );
  this.recentSearchBoxController = new RecentSearchBoxController(this.keywordStore, this.recentSearchBox);
  this.categoryBoxController = new CategoryBoxController(
    this.keywordStore,
    this.categoryBox,
    this.categoryOptionBox
  );
  this.searchHelperBoxController = new SearchHelperController(
    this.keywordStore,
    this.searchBox,
    this.categoryOptionBox
  );
};
