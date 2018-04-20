// ag-grid 的国际化信息配置文件
const filterPanel = {
  page: '页',
  more: '更多',
  to: '到',
  of: '共',
  next: 'Next',
  last: 'Last',
  first: 'First',
  previous: 'Previous',
  loadingOoo: '加 载 中 ...'
};

const setFilter = {
  selectAll: '全选',
  searchOoo: '搜索...',
  blanks: 'Blanks',
};

const numberFilterAndTextFilter = {
  filterOoo: '搜索...',
  applyFilter: '开始搜索',
};

const numberFilter = {
  equals: '等于',
  notEqual: '不等于',
  lessThanOrEqual: '小于等于',
  greaterThanOrEqual: '大于等于',
  inRange:'daInRange',
  lessThan: '小于',
  greaterThan: '大于',
};

const textFilter = {
  contains: '包含',
  startsWith: '以...开始',
  endsWith: '以...结尾',
};

const headerOfDefaultGroupColumn = {
  group: '当前分组',
};

const toolPanel = {
  columns: '所有列',
  rowGroupColumns: 'Pivot Cols',
  rowGroupColumnsEmptyMessage: '将需要分组查询的“列”拖拽至此处',
  valueColumns: 'Value Cols',
  pivotMode: '透视模式',
  groups: '分组详情',
  values: '聚合分析值',
  pivots: 'laPivots',
  valueColumnsEmptyMessage: '将需要聚合分析的‘列’拖拽到此处',
  pivotColumnsEmptyMessage: 'drag here to pivot',
};

const other = {
  noRowsToShow: '暂无数据',
};

const enterPriseMenu = {
  pinColumn: '固定“列”',
  valueAggregation: '聚合值',
  autosizeThiscolumn: '自适应当前列',
  autosizeAllColumns: '自适应所有列',
  groupBy: '分组',
  ungroupBy: '取消分组',
  resetColumns: '重置所有‘列’',
  expandAll: '展开所有',
  collapseAll: '收缩所有',
  toolPanel: '工具栏',
  export: '导出',
  csvExport: '导出CSV',
  excelExport: '导出Excel',
};

const enterPriseMenuPinning = {
  pinLeft: '向左固定',
  pinRight: '向右固定',
  noPin: '取消固定',
};

const enterPriseAggregationAndStatusPanel = {
  sum: '求和',
  min: '最小值',
  max: '最大值',
  first: '首值',
  last: '末值',
  none: 'None',
  count: '计数',
  avg: '平均',
  average: '平均值'
};

const standardMenu = {
  copyWithHeaders: '复制（含表头）',
  copy: '复制',
  ctrlC: 'ctrl+C',
  paste: '粘贴',
  ctrlV: 'ctrl+V'
};

export default Object.assign(
  {},
  filterPanel,
  setFilter,
  numberFilterAndTextFilter,
  numberFilter,
  textFilter,
  headerOfDefaultGroupColumn,
  toolPanel,
  other,
  enterPriseMenu,
  enterPriseMenuPinning,
  enterPriseAggregationAndStatusPanel,
  standardMenu
);
