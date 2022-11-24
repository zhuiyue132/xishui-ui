/*
 * @Author: chenghao
 * @Date: 2022-11-19 23:42:45
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-11-24 18:09:13
 * @Desc: 按钮配置
 */
import { useSizeProp } from '@xs-ui/hooks';

// 按钮类型;
export const buttonTypes = ['primary', 'success', 'warning', 'info', 'danger', 'link', ''];
// 原生按钮类型；
export const buttonNativeTypes = ['button', 'submit', 'reset'];
// 按钮事件；
export const Emits = ['click'];

export const Props = {
  /**
   * @description button size
   */
  size: useSizeProp,
  /**
   * @description disable the button
   */
  disabled: Boolean,
  /**
   * @description button type
   */
  type: {
    type: String,
    values: buttonTypes,
    default: ''
  },
  /**
   * @description native button type
   */
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button'
  },

  /**
   * @description determine whether it's a plain button
   */
  plain: Boolean,
  /**
   * @description native button autofocus
   */
  autofocus: Boolean,
  /**
   * @description determine whether it's a round button
   */
  round: Boolean,
  circle: Boolean
};
