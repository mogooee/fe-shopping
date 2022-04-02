import { $ } from "../../utils/utils.js";
import { CarouselStore } from "../../model/carouselStore.js";
import { TodaysHot } from "./TodaysHot.js";
import { TodaysHotController } from "../../controller/main/TodaysHotController.js";

export class Main {
  constructor(target) {
    this.target = target;
  }

  render() {
    this.target.innerHTML = this.template();
  }

  template() {
    return `<div class="todays-hot"></div>`;
  }

  mount() {
    const carouselStore = new CarouselStore();
    const todaysHotController = new TodaysHotController(carouselStore);
    const todaysHot = new TodaysHot($(".todays-hot"), todaysHotController);
  }
}
