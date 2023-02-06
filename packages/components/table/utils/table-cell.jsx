import numeral from 'numeral';
import { formatOriginal as defaultFormatter, formatPercent, formatNumber } from './format.js';
import { XsProgressCell, XsColorFontCell, XsColorBlockCell } from '../components';
import { ElTooltip } from 'element-plus';
/**
 * 创建进度条的单元格
 * @param {*} param0
 */
export const createProgressCell = ({ value = 0, formatter = defaultFormatter, max = 0, animated, prefix, suffix }) => {
  const width = max ? formatPercent(numeral(value).divide(max).value()) : 0;
  return (
    <XsProgressCell
      width={width}
      value={value}
      formatter={formatter}
      animated={animated}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

/**
 * 创建颜色字体的单元格;
 */
export const createColorFontCell = ({ value = 0, formatter = defaultFormatter, isPositive }) => {
  return <XsColorFontCell value={value} formatter={formatter} isPositive={isPositive} />;
};

/**
 * 颜色块的单元格;
 */
export const createColorBlockCell = ({ value = 0, formatter = defaultFormatter, base = 10, align = 'right' }) => {
  return <XsColorBlockCell value={value} formatter={formatter} base={base} align={align} />;
};

/**
 * 平均值色块单元格;
 * 如果值大于平均值，则显示色块，否则只显示文字；
 */
export const createAverageCell = ({ average = 0, value = 0, formatter = defaultFormatter }) => {
  const isHighlight = +value > +average;
  return (
    <div class={`xs-average-cell ${isHighlight ? 'active' : ''}`}>
      <div>{formatter(value)}</div>
    </div>
  );
};

/**
 * 创建有tooltip的单元格;
 */
export const createTooltipCell = (text, content) => {
  return (
    <ElTooltip class="item" effect="dark" content={content} placement="right" raw-content hide-after={0}>
      <span class="ellipsis">{text}</span>
    </ElTooltip>
  );
};
export const createTooltipListCell = (text, list = [], showRoi = false) => {
  if (!list.length) return text;

  const nameList = list.map(({ name }) => ({ key: 'name', value: name }));
  const costList = list.map(({ cost }) => ({ key: 'cost', value: cost }));
  const roiList = list.map(({ roi }) => ({ key: 'roi', value: roi, label: 'ROI: ' }));

  let costStr = '<ul class="tooltip-cost__list">';

  const list2 = [nameList, costList];
  if (showRoi) {
    list2.push(roiList);
  }

  costStr += list2
    .map(child => {
      const domStr = child
        .map(item => {
          let str = '';
          if (item.key === 'name') {
            str = `<div>${item.value}</div>`;
          } else if (item.key === 'cost') {
            str = `<div>${formatNumber(item.value)}</div>`;
          } else if (item.key === 'roi') {
            str = `<div class="roi"> 
                    <span>${formatNumber(item.value, '0.00') === '--' ? '' : item.label}</span>
                    <span>${formatNumber(item.value, '0.00')}</span> 
                  </div>`;
          }

          return str;
        })
        .join('');

      return `<li class="tooltip-cost__item"> ${domStr} </li>`;
    })
    .join('');

  costStr += '</ul>';

  return createTooltipCell(text, costStr);
};

/**
 * 创建有薪水的单元格;
 */
export const createSalaryCell = () => {};

/**
 * 创建有警告的单元格;
 */
export const createWarningCell = () => {};

/**
 * 创建有趋势的单元格;
 */
export const createTrendCell = () => {};
