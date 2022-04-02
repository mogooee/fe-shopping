export class CarouselStore {
  constructor() {
    this.hotContentsIndex = 0;
  }

  setCarouselData(data) {
    this.todaysHotCarouselData = data;
  }
}
