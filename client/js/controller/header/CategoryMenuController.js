import { fetchData } from "../../utils/utils.js";

export class CategoryMenuController {
  constructor(keywordStore) {
    this.keywordStore = keywordStore;
  }

  async fetchCategoryMenuData() {
    this.categoryMenuData = await fetchData("http://localhost:3000/option/detail-category");
    // this.keywordStore.setCategoryMenuData(this.categoryMenuData);
    return this.categoryMenuData;
  }

  dropSubMenu(selectedCategory) {
    const basicDepth = 1;
    const [subCategory, subDepth, categoryImg] = this.getSubCategoryData(
      this.categoryMenuData,
      selectedCategory,
      basicDepth
    );
    this.renderSubMenu(subCategory, subDepth, categoryImg);
  }

  getSubCategoryData(data, target, depth) {
    for (let obj of data) {
      if (obj.category === target) {
        return [obj.subCategory, depth + 1, obj.img];
      } else {
        if (obj.subCategory) {
          const returnValue = this.getSubCategoryData(obj.subCategory, target, depth + 1);
          if (returnValue) return returnValue;
        }
      }
    }
  }
}
