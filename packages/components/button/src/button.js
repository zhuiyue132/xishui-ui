/*
 * @Author: chenghao
 * @Date: 2022-11-19 23:42:45
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-11-20 21:16:18
 * @Desc: 按钮配置
 */
import { useSizeProp } from '@xs-ui/hooks';

// 按钮类型;
export const buttonTypes = ['default', 'primary', 'success', 'warning', 'info', 'danger', 'text', ''];
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
   * @description determine whether it's a text button
   */
  text: Boolean,
  /**
   * @description determine whether it's a link button
   */
  link: Boolean,
  /**
   * @description determine whether the text button background color is always on
   */
  bg: Boolean,
  /**
   * @description native button autofocus
   */
  autofocus: Boolean,
  /**
   * @description determine whether it's a round button
   */
  round: Boolean,
  /**
   * @description determine whether it's a circle button
   */
  circle: Boolean,
  /**
   * @description custom button color, automatically calculate `hover` and `active` color
   */
  color: String,
  /**
   * @description dark mode, which automatically converts `color` to dark mode colors
   */
  dark: Boolean
};
