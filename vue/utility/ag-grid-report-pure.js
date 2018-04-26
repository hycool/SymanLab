import { Grid } from 'ag-grid';
import "../../node_modules/ag-grid/dist/styles/ag-grid.css"
import "../../node_modules/ag-grid/dist/styles/ag-theme-balham.css"
import "ag-grid-enterprise/main";
import { LicenseManager } from "ag-grid-enterprise/main";
import Papa from 'papaparse';

// 设置enterprise key
// 以下license key 为研发试用key，有效期到2018-06-06
LicenseManager.setLicenseKey("Evaluation_License_Valid_Until_6_June_2018__MTUyODIzOTYwMDAwMA==4c69615c372b7cdc6c4bda8601ac106b");
const cssFeatures = {
  hover: 'ag-syman-hover',
  imagePreviewBox: 'image-preview-box',
  tooltipBox: 'tooltip-box'
};

const localeText = {
  // filterPanel
  page: '页',
  more: '更多',
  to: '到',
  of: '共',
  next: 'Next',
  last: 'Last',
  first: 'First',
  previous: 'Previous',
  loadingOoo: '加 载 中 ...',
  // setFilter
  selectAll: '全选',
  searchOoo: '搜索...',
  blanks: '空值',
  // numberFilterAndTextFilter
  filterOoo: '搜索...',
  applyFilter: '开始搜索',
  // numberFilter
  equals: '等于',
  notEqual: '不等于',
  notContains: '不包含',
  lessThanOrEqual: '小于等于',
  greaterThanOrEqual: '大于等于',
  inRange:'daInRange',
  lessThan: '小于',
  greaterThan: '大于',
  // textFilter
  contains: '包含',
  startsWith: '以...开始',
  endsWith: '以...结尾',
  // headerOfDefaultGroupColumn
  group: '当前分组',
  // toolPanel
  columns: '工具栏',
  rowGroupColumns: 'Pivot Cols',
  rowGroupColumnsEmptyMessage: '将需要分组查询的“列”拖拽至此处',
  valueColumns: 'Value Cols',
  pivotMode: '透视模式',
  groups: '分组详情',
  values: '聚合分析列',
  pivots: '透视列',
  valueColumnsEmptyMessage: '将需要聚合分析的‘列’拖拽到此处',
  pivotColumnsEmptyMessage: '将需要透视分析的‘列’拖拽至此处',
  // other
  noRowsToShow: '暂无数据',
  // enterPriseMenu
  pinColumn: '固定“列”',
  valueAggregation: '聚合值',
  autosizeThiscolumn: '自适应当前列',
  autosizeAllColumns: '自适应所有列',
  groupBy: '分组',
  ungroupBy: '取消分组',
  resetColumns: '重置所有列',
  destroyColumnComps: '重置所有列',
  expandAll: '展开所有',
  collapseAll: '收缩所有',
  toolPanel: '工具栏',
  export: '导出',
  csvExport: '导出CSV',
  excelExport: '导出Excel',
  // enterPriseMenuPinning
  pinLeft: '向左固定',
  pinRight: '向右固定',
  noPin: '取消固定',
  // enterPriseAggregationAndStatusPanel
  sum: 'Sum',
  min: 'Min',
  max: 'Max',
  first: 'First',
  last: 'Last',
  none: 'None',
  count: 'Count',
  avg: 'Avg',
  average: '平均值',
  // standardMenu
  copyWithHeaders: '复制（含表头）',
  copy: '复制',
  ctrlC: 'ctrl+C',
  paste: '粘贴',
  ctrlV: 'ctrl+V'
};

const setCommonStyles = (options) => {
  const commonStyles = document.createElement('style');
  const styleArray = [
    `${options && options.showAgToolPanelItem ? '' : '.ag-column-tool-panel-item { display: none; } .ag-filter-body { padding-left: 4px }'}`, // 禁止隐藏全部列
    `.${cssFeatures.hover} { cursor: pointer; }`,
  ];
  commonStyles.innerHTML = styleArray.join('\r\n');
  return commonStyles;
};

// 公共方法
const cleanChildNode = (node) => {
  // 清空agGridTableContainer
  while(node && node.firstChild) { node.removeChild(node.firstChild); }
};

// 替换Html Dom
const replaceNode = (node) => {
  const clone = node.cloneNode(true);
  node.parentNode.appendChild(clone);
  node.remove();
};

const exportCustomExcel = (csvData, groupState) => {
  let groupNumber = 0;
  groupState.forEach(d => {
    // 分组列的groupId形如： FAKE_PATH_ag-Grid-AutoColumn-field2}_0
    if (d.groupId.indexOf('FAKE_PATH') > -1) {
      groupNumber += 1;
    }
  });
  const simplifyData = [];
  Papa.parse(csvData, {
    complete(result) {
     const { data } = result;
     data.forEach((d, i) => {
       if (d[0].replace(/\s/g, '').split('->')[1]) {
         d[0] = d[0].replace(/\s/g, '').split('->')[1]
       }

       // 处理无效数据
       if (d[groupNumber - 1] !== '') {
         simplifyData.push(d);
       }
     });

     // 填补显示问题
     simplifyData.forEach((d, i) => {
       for (let j = 1; j < groupNumber -1; j++) {
         if (d[j] === '') {
           d[j] = simplifyData[i - 1][j];
         }
       }
     });

     console.log(simplifyData);
    }
  })
};

/**
 * @param agGridTableContainer // 容器
 * @param options // 配置项
 * @returns {function(*=, *=)} 函数
 */
const agReport = (agGridTableContainer, options) => {
  if (!(agGridTableContainer instanceof HTMLElement)) {
    alert('agGridTableContainer is not a HTMLElement');
    return null;
  }
  cleanChildNode(agGridTableContainer); // 清空agGridTableContainer节点

  // create normal gird for top
  const agGridDiv = document.createElement('div');
  agGridDiv.style.width = '100%';
  agGridDiv.style.height = '100%';
  agGridDiv.style.margin = '0 auto';
  agGridDiv.style.position = 'relative';
  agGridDiv.setAttribute('class', 'ag-theme-balham');  // 设置主题
  agGridTableContainer.appendChild(agGridDiv);

  // create bottom grid as total footer
  // const agGridDivBottom = document.createElement('div');
  // agGridDivBottom.style.width = '100%';
  // agGridDivBottom.style.height = '40px';
  // agGridDivBottom.style.margin = '0 auto';
  // agGridDivBottom.style.position = 'relative';
  // agGridDivBottom.setAttribute('class', 'ag-theme-balham');  // 设置主题
  // agGridTableContainer.appendChild(agGridDivBottom);

  // 为agGridDiv设置通用样式
  agGridDiv.appendChild(setCommonStyles(options));

  const gridOptions = {
    columnDefs: options && options.columnDefs ? options.columnDefs : [], // 列定义
    rowData : options && options.rowData ? options.rowData : [],// 行数据
    multiSortKey: 'ctrl', // 多列排序组合键（按下ctrl + 鼠标点击某一列）
    animateRows: false, // 显示row动画
    pagination: options && options.pagination !== undefined ? options.pagination : false, // 是否启用分页
    paginationPageSize: 10,
    enableColResize: options && options.enableColResize !== undefined ? options.enableColResize : true, // 允许用户调整列宽
    enableFilter: options && options.enableFilter !== undefined ? options.enableFilter : true, // 是否允许过滤
    enableStatusBar: true, // 当用户在视图区进行区域选择的时候，是否显示所有可计算数据的[平均、求和、计数、最大、最小]等值
    enableRangeSelection: false, // 是否允许进行单元格区域选择
    rowSelection: "multiple", // 行选择模式
    rowDeselection: options && options.rowDeselection !== undefined ? options.rowDeselection : false, // 是否允许按住ctrl + click 取消选中某个已经选中的行
    groupSelectsChildren: options && options.groupSelectsChildren !== undefined? options.groupSelectsChildren : false, // 当进行分组的时候，控制选择分组的行为，是否连带其children一起选中
    defaultColDef: {
      comparator: options && options.sortByLocal ? null : function() {return 0; },
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
    }, // 默认列配置
    enableCellChangeFlash: true,
    pivotPanelShow: 'always', // on of ['always','onlyWhenPivoting'] 表头上方可用于拖拽pivot列的区域
    pivotMode: true,
    pivotTotals: false,
    showToolPanel: true, // 显示工具栏
    toolPanelSuppressValues: true, // 引用aggregate value section 面板
    floatingFilter: options && options.floatingFilter ? options.floatingFilter : true, // 是否显表头下方的浮动筛选框
    rowDragManaged: true,
    rowGroupPanelShow: options && options.rowGroupPanelShow ? options.rowGroupPanelShow : 'always', // 是否显最顶部的group panel ['always', 'onlyWhenGrouping']
    enterMovesDownAfterEdit: true,
    localeText,
    groupDefaultExpanded: 9, //
    groupMultiAutoColumn: true, // 分组时，显示分组原字段
    autoGroupColumnDef: {
      cellRendererParams:{
        suppressCount: true, // 禁用分组状态下，各个分组行的计数统计
      },
    },
    groupHideOpenParents: true, // 分组隐藏
    onGridReady(params) {
      const { columnApi, api } = params;
      // 自适应所有列
      columnApi.autoSizeAllColumns();
      exportCustomExcel(api.getDataAsCsv(), columnApi.getColumnGroupState());
      // clone [span.ag-pivot-mode-select] and replace it in order to disable its event listeners
      replaceNode(document.querySelector('span.ag-pivot-mode-select'));
    }, // 当表格渲染好之后，触发onGridReady
    onColumnRowGroupChanged(params) {
      const { columnApi } = params;
      columnApi.getColumnState().forEach(d => {
        const { rowGroupIndex } = d;
        if (rowGroupIndex !== undefined && rowGroupIndex !== null) {
          console.log('column group changed', rowGroupIndex, d.colId);
        }
      });
    },
    onColumnPivotChanged(params) {
      const { columnApi } = params;
      columnApi.getColumnState().forEach(d => {
        const { pivotIndex } = d;
        if (pivotIndex !== undefined && pivotIndex !== null) {
          console.log('column pivot changed', pivotIndex, d.colId);
        }
      });
    },
    onColumnValueChanged(params) {
      const { columnApi } = params;
      columnApi.getColumnState().forEach(d => {
        const { aggFunc } = d;
        if (aggFunc !== undefined && aggFunc !== null) {
          console.log('column value changed', aggFunc, d.colId, d);
        }
      });
    },
    onColumnPivotModeChanged(params) {
      console.log('onColumnPivotModeChanged', params);
    }
  };

  // 初始化ag grid
  new Grid(agGridDiv, gridOptions);

  const { api, columnApi } = gridOptions;
  agReport.api = api;
  agReport.columnApi = columnApi;
  // 设置columnDefs
  agReport.setCols = (data) => {
    if (!data) { return agReport; } // 如果未传参，则返回。
    if (!(Object.prototype.toString.call(data) === '[object Array]')) {
      alert('agReport.setCols requires Array as first param');
      return agReport;
    }
    api.setColumnDefs(data);
    return agReport;
  };

  // 设置rowData
  agReport.setRows = (data) => {
    if (!data) { return agReport; } // 如果未传参，则返回。
    if (!(Object.prototype.toString.call(data) === '[object Array]')) {
      alert('agReport.setRows requires Array as first param');
      return agReport;
    }
    const beginSetRow = Date.now();
    api.setRowData(data);
    console.log('渲染耗时 ', Date.now() - beginSetRow);
    console.log('总耗时 ', Date.now() - window.beforeMountTime);
    return agReport;
  };

  // 设置默认排序规则
  agReport.setSortModel = (data) => {
    if (!data) { return agReport; } // 如果未传参，则返回。
    // data: [{ colId: 'IMAGE', sort: 'asc' }]
    if (!(Object.prototype.toString.call(data) === '[object Array]')) {
      alert('agReport.setSortModel requires Array as first param');
      return agReport;
    }
    api.setSortModel(data);
  };

  return agReport;
};

export default agReport;
