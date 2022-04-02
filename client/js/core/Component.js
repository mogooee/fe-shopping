export class Component {
  constructor(target, controller) {
    this.target = target;
    this.controller = controller;
    this.run();
  }

  async run() {
    await this.fetch();
    this.render();
    this.getElement();
    this.bindController();
    this.setEvent();
  }

  async fetch() {}

  template() {
    return "";
  }

  render() {
    this.target.innerHTML = this.template();
  }

  getElement() {}

  bindController() {}

  setEvent() {}
}
