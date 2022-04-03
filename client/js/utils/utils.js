export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
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
export const checkArrowUpDown = (key) => {
  return key === "ArrowUp" || key === "ArrowDown";
};
export const isArrowKey = (key) => {
  return key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight";
};
export const fetchData = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
export const debouncing = (callback, delay) => {
  let timerId;
  return (event) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(
      () => {
        callback(event);
      },
      delay,
      event
    );
  };
};
