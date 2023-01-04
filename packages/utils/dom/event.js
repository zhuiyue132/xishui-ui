/**
 * 事件绑定
 * @param {*} element dom元素
 * @param {*} event 事件名称
 * @param {*} handler 事件处理函数
 * @param {*} useCapture 是否捕获
 */
export const on = (element, event, handler, useCapture = false) => {
  if (element && event && handler) {
    element?.addEventListener(event, handler, useCapture);
  }
};

/**
 * 事件解绑
 * @param {*} element dom元素
 * @param {*} event 事件名称
 * @param {*} handler 事件处理函数
 * @param {*} useCapture 是否捕获
 * */
export const off = (element, event, handler, useCapture = false) => {
  if (element && event && handler) {
    element?.removeEventListener(event, handler, useCapture);
  }
};

/**
 *  事件绑定一次
 * @param {*} el dom元素
 * @param {*} event 事件名称
 * @param {*} fn  事件处理函数
 */
export const once = (el, event, fn) => {
  const listener = function (_this, ...args) {
    if (fn) {
      fn.apply(_this, args);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};
