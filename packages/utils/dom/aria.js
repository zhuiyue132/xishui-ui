export const isLeafDom = el => !el.getAttribute('aria-owns');

export const focusNode = el => {
  if (!el) return;
  el.focus();
  !isLeafDom(el) && el.click();
};

export const getSibling = (el, distance, elClass) => {
  const { parentNode } = el;
  if (!parentNode) return null;
  const siblings = parentNode.querySelectorAll(elClass);
  const index = Array.prototype.indexOf.call(siblings, el);
  return siblings[index + distance] || null;
};
