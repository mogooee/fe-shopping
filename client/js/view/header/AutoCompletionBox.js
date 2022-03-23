import { Component } from "../../core/Component.js";
import { $ } from "../../utils/utils.js";

export class AutoCompletionBox extends Component {
  constructor(target) {
    super(target);
  }

  setState() {
    this.autoCompletionBox = $(".auto-completion-box");
    this.autoCompletionBoxList = $(".auto-completion-box__contents__list");
  }

  template() {
    return `<div class="auto-completion-box__contents">
            <ul class="auto-completion-box__contents__list"></ul>
            </div>`;
  }

  showAutoCompletionBox(keywordArr) {
    this.autoCompletionBox.classList.remove("hidden");
    if (keywordArr)
      this.autoCompletionBoxList.innerHTML = keywordArr.reduce(
        (acc, cur, index) => acc + `<li data-value="${cur}" data-index="${index}">${cur}</li>`,
        ""
      );
  }

  hideAutoCompletionBox() {
    this.autoCompletionBox.classList.add("hidden");
  }

  onfocusAutoCompletionKeyword(inputKeyword) {
    const autoCompletionKeywordList = this.autoCompletionBox.querySelectorAll("li");
    autoCompletionKeywordList.forEach((e) => {
      e.innerHTML = e.innerHTML.replace(
        new RegExp(inputKeyword),
        "<span style='color:#4285f4'>" + inputKeyword + "</span>"
      );
    });
  }
}
