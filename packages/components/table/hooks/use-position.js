// 数据变化时是否需要重置表格位置
import { toRefs, watch } from 'vue';

export const useTablePosition = (reference, $data, props) => {
  const { resetPositionOnDataChange } = toRefs(props);
  const changePosition = () => {
    if (!resetPositionOnDataChange.value || !reference.value) return;
    reference.value.scrollIntoView();
  };
  watch($data, changePosition);
};
