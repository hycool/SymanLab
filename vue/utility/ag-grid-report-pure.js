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

const setCommonStyles = () => {
  const commonStyles = document.createElement('style');
  const styleArray = [
    `.pos-ag-report-container { font-family: 'Microsoft YaHei', 'Hiragino Sans GB', !important; }`,
    '.ag-pinned-left-cols-container .ag-row { background-color: rgba(0, 145, 234, 0.3); }',
    '.ag-row-footer { background-color: #f7f7f7 !important; }',
    '.ag-tool-panel .ag-column-select-panel { flex-grow: 1; }',
    '.ag-theme-balham .ag-header { font-weight: 500 }',
    '.ag-body-viewport::-webkit-scrollbar, .ag-column-container::-webkit-scrollbar, .ag-column-drop-list::-webkit-scrollbar { width: 8px; height: 8px; }',
    '.ag-body-viewport::-webkit-scrollbar-thumb, .ag-column-container::-webkit-scrollbar-thumb, .ag-column-drop-list::-webkit-scrollbar-thumb { background-color: #c5c2c2; border-radius: 5px; }',
    '.ag-body-viewport::-webkit-scrollbar-track, .ag-column-container::-webkit-scrollbar-track, .ag-column-drop-list::-webkit-scrollbar-track { box-shadow: inset 0 0 15px lightgray; background-color: #f8f7f7; border-radius: 5px; }',
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
const replaceNode = (node, callback) => {
  const clone = node.cloneNode(true);
  node.parentNode.appendChild(clone);
  node.remove();
  if (typeof callback === 'function') {
    callback();
  }
  return clone;
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

     // console.log(simplifyData);
    }
  })
};

/**
 * @param container // 容器
 * @param opt // 配置项
 * @returns {function(*=, *=)} 函数
 */
const initializeAgReport = (container, opt) => {
  const agReport = (agGridTableContainer, options) => {
    let updateBodyScrollDelay = -1; // 横向滚动延迟计时器
    if (!(agGridTableContainer instanceof HTMLElement)) {
      console.log('agGridTableContainer is not a HTMLElement: agGridTableContainer = ', agGridTableContainer);
      agReport.containerIsNull = true;
      return agReport;
    } else {
      agReport.containerIsNull = false;

      if(opt) {
        agReport.allVisibleColumns = options.allVisibleColumns; // 所有允许可见的列
        agReport.displayedColumns = options.displayedColumns; // 默认展示的列
        agReport.groupAllowedColumns = options.groupAllowedColumns; // 所有允许分组查看的列
        agReport.defaultGroupColumns = options.defaultGroupColumns; // 当前默认的分组情况
        agReport.aggregationColumns = options.aggregationColumns; // 所有聚合列的信息
      }

      // 判断agGridTableContainer是否已经被ag实例化
      if (agGridTableContainer.agReport) {
        agGridTableContainer.agReport.customizeOptions = options;
        return agGridTableContainer.agReport;
      }
    }
    cleanChildNode(agGridTableContainer); // 清空agGridTableContainer节点

    // create normal gird for top
    const agGridDiv = document.createElement('div');
    agGridDiv.style.width = '100%';
    agGridDiv.style.height = '100%';
    agGridDiv.style.margin = '0 auto';
    agGridDiv.style.position = 'relative';
    agGridDiv.classList.add('ag-theme-balham'); // 设置主题
    agGridDiv.classList.add('pos-ag-report-container');
    agGridTableContainer.appendChild(agGridDiv);

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
      suppressRowClickSelection: true, // 禁用单击事件选中行
      rowDeselection: options && options.rowDeselection !== undefined ? options.rowDeselection : false, // 是否允许按住ctrl + click 取消选中某个已经选中的行
      groupSelectsChildren: options && options.groupSelectsChildren !== undefined? options.groupSelectsChildren : false, // 当进行分组的时候，控制选择分组的行为，是否连带其children一起选中
      defaultColDef: {
        comparator: options && options.sortByLocal ? null : function() {return 0; },
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
      }, // 默认列配置
      enableCellChangeFlash: true,
      pivotPanelShow: 'onlyWhenPivoting', // on of ['always','onlyWhenPivoting'] 表头上方可用于拖拽pivot列的区域
      pivotMode: false,
      pivotTotals: false,
      showToolPanel: true, // 显示工具栏
      toolPanelSuppressPivotMode: true, // 禁用pivote mode
      toolPanelSuppressValues: true, // 禁用aggregate value section 面板
      toolPanelSuppressPivots: true, // 禁用 pivot section 面板
      groupIncludeFooter: true, // 是否显示分组的footer
      floatingFilter: options && options.floatingFilter ? options.floatingFilter : false, // 是否显表头下方的浮动筛选框
      rowDragManaged: true,
      rowGroupPanelShow: options && options.rowGroupPanelShow ? options.rowGroupPanelShow : 'onlyWhenGrouping', // 是否显最顶部的group panel ['always', 'onlyWhenGrouping']
      enterMovesDownAfterEdit: true,
      localeText,
      groupDefaultExpanded: 1, // 默认展开几层分组
      groupMultiAutoColumn: true, // 分组时，显示分组原字段
      autoGroupColumnDef: {
        cellRendererParams:{
          suppressCount: true, // 禁用分组状态下，各个分组行的计数统计
        },
      },
      groupHideOpenParents: true, // 分组隐藏
      onGridReady(params) {
        const defaultGroups = agReport.defaultGroupColumns;
        const { columnApi } = params;
        // 自适应所有列
        columnApi.autoSizeAllColumns();
        // 处理分组情况
        columnApi.setColumnsPinned(defaultGroups.map(d => `ag-Grid-AutoColumn-${d}`), true);
        // replaceNode(document.querySelector('.ag-pivot-mode-select')).innerText = '工具栏';

      }, // 当表格渲染好之后，触发onGridReady
      onColumnRowGroupChanged(params) {
        const { columnApi } = params;
        columnApi.autoSizeAllColumns();
      }, // 分组变化
      onBodyScroll(params) {
        const { columnApi, direction } = params;
        clearTimeout(updateBodyScrollDelay);
        if (direction === 'horizontal') {
          updateBodyScrollDelay = setTimeout(() => {
            columnApi.autoSizeAllColumns();
          }, 10); // 当检测到滚动条为横向滚动时，自适应当前视口范围内的所有列
        }
        agGridTableContainer.setAttribute('data-scroll-left', params.left);
      }, // 当表体发生滚动时候触发该事件
      onColumnPivotChanged(params) {
        const { columnApi } = params;
        columnApi.getColumnState().forEach(d => {
          const { pivotIndex } = d;
          if (pivotIndex !== undefined && pivotIndex !== null) {
            // console.log('column pivot changed', pivotIndex, d.colId);
          }
        });
      }, // 透视变化
      onColumnValueChanged(params) {
        const { columnApi } = params;
        columnApi.autoSizeAllColumns();
      }, // aggregation 变化
      onColumnPivotModeChanged(params) {
        // console.log('onColumnPivotModeChanged', params);
      }, // pivot mode 变化
      onModelUpdated(params) {
        const { columnApi } = params;
        columnApi.autoSizeAllColumns();
      },
    };

    // 初始化ag grid
    new Grid(agGridDiv, gridOptions);

    const { api, columnApi } = gridOptions;
    agReport.api = api;
    agReport.columnApi = columnApi;

    // 处理分组情况
    agReport.dealGroupInfo = () => {
      const defaultGroups = agReport.defaultGroupColumns;
      if (defaultGroups) {
        columnApi.setRowGroupColumns(defaultGroups);
      }
      return agReport;
    };

    // 设置columnDefs
    agReport.setCols = (data) => {
      const defaultGroups = agReport.defaultGroupColumns;
      const displayedColumns = agReport.displayedColumns;
      const aggregationColumns = agReport.aggregationColumns;
      if (!data) { return agReport; } // 如果未传参，则返回。
      if (!(Object.prototype.toString.call(data) === '[object Array]')) {
        alert('agReport.setCols requires Array as first param');
        return agReport;
      }
      // 处理suppressToolPanel
      data.forEach(d => {
        if (defaultGroups && defaultGroups.indexOf(d.field) === -1) {
          d.suppressToolPanel = true;
        }
      });
      api.setColumnDefs(data);
      // 处理显示隐藏列
      columnApi.setColumnsVisible(data.map(d => d.field), false);
      columnApi.setColumnsVisible(displayedColumns || [], true);
      // 处理汇总计算列
      columnApi.setValueColumns(aggregationColumns || []);
      columnApi.setColumnsVisible(aggregationColumns || [], true);
      agReport.dealGroupInfo();
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

    // autoSizeAllColumns
    agReport.autoSizeAllColumns = () => {
      columnApi.autoSizeAllColumns();
    };

    agGridTableContainer.agReport = agReport;
    return agReport;
  };
  return agReport(container, opt);
};

export default initializeAgReport;
