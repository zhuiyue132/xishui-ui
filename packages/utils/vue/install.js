/**
 * 组件注册辅助函数;
 * @param comp
 * @returns {Error|*}
 */
export const withInstall = (comp) => {
  if (!comp) {
    return new Error("没传组件进来")
  }
  comp.install = (Vue) => {
    Vue.component(comp.name, comp)
  }
  return comp
}
