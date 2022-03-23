export class Component {
  constructor(target) {
    this.target = target;
    this.render();
    this.setState();
  }

  setState() {}

  template() {
    return "";
  }
  render() {
    this.target.innerHTML = this.template();
  }
}
