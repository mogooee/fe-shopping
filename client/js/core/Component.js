export class Component {
  constructor(target, controller) {
    this.target = target;
    this.controller = controller;
    this.render();
    this.setElement();
    this.bindController();
    this.setEvent();
  }

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
