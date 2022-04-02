import { fetchData } from "../../utils/utils.js";
import { debouncing } from "../../utils/utils.js";

export class TodaysHotController {
  constructor(keywordStore) {
    this.keywordStore = keywordStore;
  }

  async fetchCarouselData() {
    this.todaysHotData = await fetchData("http://localhost:3000/list/todays-hot");
    this.keywordStore.setCarouselData(this.todaysHotData);
    return this.todaysHotData;
  }

  slideShow() {
    const sec = 1000;
    this.autoTime = 2 * sec;
    this.autoSlide = this.timerInterval();
  }

  timerInterval() {
    return setInterval(() => {
      this.moveSlide();
      this.focusThumbNails();
    }, this.autoTime);
  }

  moveSlide() {
    this.keywordStore.hotContentsIndex++;
    if (this.keywordStore.hotContentsIndex >= this.todaysHotData.length)
      this.keywordStore.hotContentsIndex = 0;
    this.todaysHotContents.dataset.index = this.todaysHotData[this.keywordStore.hotContentsIndex].index;
    this.todaysHotContents.src = this.todaysHotData[this.keywordStore.hotContentsIndex].img;
  }

  changeHotContents(target) {
    const debounceFocus = debouncing((target) => {
      clearInterval(this.autoSlide);
      this.autoSlide = null;
      this.keywordStore.hotContentsIndex = target.dataset.index;
      this.focusHotContents(target);
      this.focusThumbNails(target);
    }, 50);
    debounceFocus(target);
  }

  playAutoSlide() {
    this.autoSlide = this.timerInterval();
  }
}
