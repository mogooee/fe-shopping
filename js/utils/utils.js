export const $ = (selector) => document.querySelector(selector);
export const delay = {
  set(ms) {
    return new Promise((resolve) => {
      this.timer = setTimeout(resolve, ms);
    });
  },
  clear() {
    clearTimeout(this.timer);
  },
};
