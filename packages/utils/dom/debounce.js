export function debounce(fn, wait) {
  let timer = null;
  return function () {
    let args = arguments;
    let now = !timer;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
    }, wait);
    if (now) {
      fn.apply(this, args);
    }
  };
}
