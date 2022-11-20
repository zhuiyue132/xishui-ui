/*
 * @Author: chenghao 
 * @Date: 2022-11-19 23:48:54 
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-11-19 23:56:24
 */
import { computed, inject, ref, unref } from 'vue'
import { componentSizes } from '@xs-ui/config';


export const useSizeProp = {
  type: String,
  values: componentSizes,
  required: false,
}