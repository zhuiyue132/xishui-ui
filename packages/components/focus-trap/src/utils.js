import { isClient } from '@vueuse/core';

export const obtainAllFocusableElements = element => {
  const nodes = [];
  if (!isClient) return nodes;
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
    acceptNode: node => {
      const isHiddenInput = node.tagName === 'INPUT' && node.type === 'hidden';
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 || node === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);

  return nodes;
};

export const getVisibleElement = (elements, container) => {
  for (const element of elements) {
    if (!isHidden(element, container)) return element;
  }
};

export const isHidden = (element, container) => {
  if (process.env.NODE_ENV === 'test') return false;
  if (getComputedStyle(element).visibility === 'hidden') return true;

  while (element) {
    if (container && element === container) return false;
    if (getComputedStyle(element).display === 'none') return true;
    element = element.parentElement;
  }

  return false;
};

export const getEdges = container => {
  const focusable = obtainAllFocusableElements(container);
  const first = getVisibleElement(focusable, container);
  const last = getVisibleElement(focusable.reverse(), container);
  return [first, last];
};

const isSelectable = element => {
  return element instanceof HTMLInputElement && 'select' in element;
};

export const tryFocus = (element, shouldSelect) => {
  if (element && element.focus) {
    const prevFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
      element.select();
    }
  }
};

function removeFromStack(list, item) {
  const copy = [...list];

  const idx = list.indexOf(item);

  if (idx !== -1) {
    copy.splice(idx, 1);
  }
  return copy;
}

const createFocusableStack = () => {
  let stack = [];

  const push = layer => {
    const currentLayer = stack[0];

    if (currentLayer && layer !== currentLayer) {
      currentLayer.pause();
    }

    stack = removeFromStack(stack, layer);
    stack.unshift(layer);
  };

  const remove = layer => {
    stack = removeFromStack(stack, layer);
    stack[0]?.resume?.();
  };

  return {
    push,
    remove
  };
};

export const focusFirstDescendant = (elements, shouldSelect = false) => {
  const prevFocusedElement = document.activeElement;
  for (const element of elements) {
    tryFocus(element, shouldSelect);
    if (document.activeElement !== prevFocusedElement) return;
  }
};

export const focusableStack = createFocusableStack();
