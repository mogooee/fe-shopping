import { $, $$ } from "../../utils/utils.js";
import { Component } from "../../core/Component.js";

export class TodaysHot extends Component {
  constructor(target, controller) {
    super(target, controller);
  }

  async fetch() {
    this.todaysHotData = await this.controller.fetchCarouselData();
  }

  template() {
    return `<div class="event-slider">
        <img class="todays-hot-contents" data-index=${this.todaysHotData[0].index} src="${
      this.todaysHotData[0].img
    }" />
        <ul class="todays-hot-thumb-nails">${this.todaysHotData.reduce(
          (acc, cur) =>
            acc +
            `<li><img class="${cur.index === 0 ? "selectedTumbNails" : ""}" data-index=${cur.index} src="${
              cur.subimg
            }"></li>`,
          ""
        )}</ul>
      </div>`;
  }

  bindController() {
    this.controller.todaysHotData = this.todaysHotData;
    this.controller.todaysHotContents = this.todaysHotContents;
    this.controller.focusThumbNails = this.focusThumbNails.bind(this);
    this.controller.focusHotContents = this.focusHotContents.bind(this);
  }

  getElement() {
    this.todaysHotContents = $(".todays-hot-contents");
    this.todaysHotTumbNails = $(".todays-hot-thumb-nails");
    this.todaysHotTumbNailsImg = $$(".todays-hot-thumb-nails li img");
  }

  setEvent() {
    this.controller.slideShow();
    this.todaysHotTumbNails.addEventListener("mouseover", ({ target }) => {
      target.tagName === "IMG" && this.controller.changeHotContents(target);
    });
    this.todaysHotTumbNails.addEventListener("mouseleave", () => {
      !this.autoSlide && this.controller.playAutoSlide();
    });
  }

  focusThumbNails(target) {
    const before = $(".selectedTumbNails");
    before && before.classList.remove("selectedTumbNails");
    if (target) return target.classList.add("selectedTumbNails");
    this.todaysHotTumbNailsImg[this.todaysHotContents.dataset.index].classList.add("selectedTumbNails");
  }

  focusHotContents(target) {
    this.todaysHotContents.src = this.todaysHotData[target.dataset.index].img;
  }
}
