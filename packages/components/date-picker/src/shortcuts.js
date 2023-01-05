import { computed } from 'vue';
import dayjs from 'dayjs';
import calendarjs from './calendar';
import { isNumber } from '@xishui-ui/utils';

const useShortcuts = props => {
  const getRecentYear = (yearCount = 1) => {
    const year = dayjs().year();
    return [year - yearCount, year + yearCount]; // [2021, 2023]
  };

  const isEnable = computed(() => props.shortcutsEnable);
  const yearRange = computed(() => {
    return props.shortcutsYearRange?.length ? props.shortcutsYearRange : getRecentYear();
  });

  const getShortcuts = () => {
    const list = [];
    const first = {
      text: '最近一年',
      value: [dayjs().subtract(1, 'year'), dayjs()]
    };

    const { length } = yearRange.value;
    let yearList = [];
    if (length === 1) {
      yearList = [yearRange.value[0]];
    } else {
      const count = yearRange.value.at(-1) - yearRange.value.at(0);
      yearList = new Array(count + 1).fill(0).map((_, index) => yearRange.value[0] + index);
    }

    // const yearList = new Array(length + 1).fill(0).map((_, index) => yearRange.value[0] + index);

    for (let index = 0; index < yearList.length; index++) {
      const year = +yearList[index];
      if (!isNumber(year)) continue;
      const solar = {
        text: `${year}年-阳历`,
        value: [dayjs(`${year}-01-01`), dayjs(`${year}-12-31`)]
      };

      // 农历的小尽月最后一天是廿九，大尽月最后一天是三十，即除夕可能是廿九或三十；
      const lunarLastDay = calendarjs.lunar2solar(year, 12, 30) === -1 ? 29 : 30;

      const lunar = {
        text: `${year}年-阴历`,
        value: [
          dayjs(calendarjs.lunar2solar(year, 1, 1).date),
          dayjs(calendarjs.lunar2solar(year, 12, lunarLastDay).date)
        ]
      };

      list.push(lunar, solar);
    }
    return [first, ...list.reverse()];
  };
  const shortcuts = computed(() => {
    return isEnable.value ? getShortcuts() : [];
  });

  return {
    shortcuts
  };
};
export default useShortcuts;
