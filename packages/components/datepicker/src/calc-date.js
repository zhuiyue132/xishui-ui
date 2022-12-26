import { computed, reactive } from 'vue';
import dayjs from 'dayjs';
import { add, subtract, startOf, today, yesterday, format, endOf } from './datepicker';

const useCalcDate = props => {
  const firstDayOfWeek = computed(() => props.firstDayOfWeek);
  const includesToday = computed(() => props.includesToday);
  const currentDisabledType = computed(() => props.currentDisabledType);
  const currentWeekDisabled = computed(() => currentDisabledType.value.includes('week'));
  const currentMonthDisabled = computed(() => currentDisabledType.value.includes('month'));
  const currentYearDisabled = computed(() => currentDisabledType.value.includes('year'));
  const maxDateRangeInterval = computed(() => props.dateRangeMaxInterval);

  const pickingState = reactive({
    picking: false,
    limitEnd: null,
    limitStart: null
  });
  const condition = computed(() => {
    return dates =>
      new Map([
        ['today', [today]],
        ['day1', [subtract(today, 1)]],
        ['day7', includesToday.value ? [subtract(today, 6), today] : [subtract(yesterday, 6), yesterday]],
        ['day14', includesToday.value ? [subtract(today, 13), today] : [subtract(yesterday, 13), yesterday]],
        ['day30', includesToday.value ? [subtract(today, 29), today] : [subtract(yesterday, 29), yesterday]],
        ['year1', [subtract(today, 1, 'year'), yesterday]],
        ['year2', [subtract(today, 2, 'year'), yesterday]],
        [
          'week',
          dates
            ? [dates, add(dates, 6)]
            : currentWeekDisabled.value
            ? [
                add(subtract(startOf(today, 'week'), 7), firstDayOfWeek.value),
                add(subtract(endOf(today, 'week')), firstDayOfWeek.value)
              ]
            : [add(startOf(today, 'week'), firstDayOfWeek.value), add(endOf(today, 'week'), firstDayOfWeek.value)]
        ],
        [
          'month',
          dates
            ? [dates, subtract(add(dates, 1, 'month'), 1)]
            : currentMonthDisabled.value
            ? [subtract(startOf(today, 'month'), 1, 'month'), subtract(endOf(today, 'month'), 1, 'month')]
            : [startOf(today, 'month'), endOf(today, 'month')]
        ],
        [
          'year',
          dates
            ? [dates, subtract(add(dates, 1, 'year'), 1)]
            : currentYearDisabled.value
            ? [subtract(startOf(today, 'year'), 1, 'year'), subtract(endOf(today, 'year'), 1, 'year')]
            : [startOf(today, 'year'), endOf(today, 'year')]
        ],
        [
          'lastYear1',
          currentMonthDisabled.value
            ? [startOf(subtract(today, 12, 'month'), 'month'), endOf(subtract(today, 1, 'month'), 'month')]
            : [startOf(subtract(today, 11, 'month')), endOf(today, 'month')]
        ],
        [
          'lastYear2',
          currentMonthDisabled.value
            ? [startOf(subtract(today, 24, 'month'), 'month'), endOf(subtract(today, 1, 'month'), 'month')]
            : [startOf(subtract(today, 23, 'month')), endOf(today, 'month')]
        ],
        [
          'lastMonth6',
          currentMonthDisabled.value
            ? [startOf(subtract(today, 6, 'month'), 'month'), endOf(subtract(today, 1, 'month'), 'month')]
            : [startOf(subtract(today, 5, 'month')), endOf(today, 'month')]
        ],
        [
          'lastMonth12',
          currentMonthDisabled.value
            ? [startOf(subtract(today, 12, 'month'), 'month'), endOf(subtract(today, 1, 'month'), 'month')]
            : [startOf(subtract(today, 11, 'month')), endOf(today, 'month')]
        ],
        [
          'lastMonth24',
          currentMonthDisabled.value
            ? [startOf(subtract(today, 24, 'month'), 'month'), endOf(subtract(today, 1, 'month'), 'month')]
            : [startOf(subtract(today, 23, 'month')), endOf(today, 'month')]
        ],
        ['date', dates ? [dates] : [yesterday]],
        ['daterange', dates.length ? dates : []]
      ]);
  });

  const calcDisabledDate = (type, time) => {
    const { limitStartDate, limitEndDate } = props;

    const disabledTypeObj = {
      week: [currentWeekDisabled.value],
      month: [currentMonthDisabled.value],
      year: [currentYearDisabled.value]
    };

    const defaultLimit =
      time.getTime() > dayjs(limitEndDate).valueOf() ||
      (limitStartDate && time.getTime() < dayjs(limitStartDate).valueOf());

    if (!disabledTypeObj[type]) {
      if (type === 'daterange' && maxDateRangeInterval.value > 0 && pickingState.picking) {
        return defaultLimit || time - pickingState.limitStart <= 0 || time - pickingState.limitEnd >= 0;
      }
      return defaultLimit;
    } else {
      const [disabled] = disabledTypeObj[type];

      if (disabled) {
        let startDate = dayjs().startOf(type).valueOf();
        if (type === 'week') {
          // dayjs().startOf('week')方法获取的为周日，需要加1天，若今天为周日，向前推6天
          const weekDay = dayjs().day();
          startDate = dayjs(startDate)
            .add(weekDay ? firstDayOfWeek.value : firstDayOfWeek.value - 7, 'day')
            .valueOf();
        }
        return time.getTime() >= startDate || defaultLimit;
      }
      return time.getTime() > dayjs().endOf(type).valueOf() || defaultLimit;
    }
  };

  const disabledDate = computed(() => {
    return {
      week: time => calcDisabledDate('week', time),
      date: time => calcDisabledDate('date', time),
      month: time => calcDisabledDate('month', time),
      year: time => calcDisabledDate('year', time),
      daterange: time => calcDisabledDate('daterange', time)
    };
  });

  const getDate = (type, date = '') => {
    console.log('getDate', type, date);
    return condition.value(date).get(type);
  };
  const formatDate = dates => {
    let [start, end] = dates.map(date => format(date, 'YYYY年MM月DD日'));
    if (end && end.slice(0, 5) === start.slice(0, 5)) {
      end = end.slice(5);
    }
    return [start, end].filter(Boolean).join(' - ');
  };

  const onPickDateRange = dates => {
    const [start, end] = dates;
    if (start && end) {
      pickingState.picking = false;
    } else {
      pickingState.picking = true;
      pickingState.limitStart = dayjs(start).subtract(maxDateRangeInterval.value, 'day').toDate();
      pickingState.limitEnd = dayjs(start).add(maxDateRangeInterval.value, 'day').toDate();
    }
  };

  return {
    getDate,
    formatDate,
    disabledDate,
    onPickDateRange
  };
};

export default useCalcDate;
