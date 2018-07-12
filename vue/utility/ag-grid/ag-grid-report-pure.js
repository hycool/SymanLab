import { Grid } from 'ag-grid';
import "../../../node_modules/ag-grid/dist/styles/ag-grid.css"
import "../../../node_modules/ag-grid/dist/styles/ag-theme-balham.css"
import "ag-grid-enterprise/main";
import { LicenseManager } from "ag-grid-enterprise/main";
import Papa from 'papaparse';

// 设置enterprise key
LicenseManager.setLicenseKey("COGITO_SOFTWARE_Co_Ltd_on_behalf_of_FAST_FISH_(CHINA)_APPAREL_LTD._,CO_MultiApp_1Devs2_July_2019__MTU2MjAyMjAwMDAwMA==73f4b2d33a7f2bf6aca17a21940fd8ed");
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
  next: '向后',
  previous: '向前',
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
  inRange:'在...范围内',
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
  rowGroupColumns: '透视列',
  rowGroupColumnsEmptyMessage: '将需要分组查询的“列”拖拽至此处',
  valueColumns: '聚合列',
  pivotMode: '透视模式',
  groups: '分组详情',
  values: '聚合分析值',
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
  resetColumns: '重置所有列位置信息',
  destroyColumnComps: '重置所有列位置信息',
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
  sum: '求和',
  min: '最小值',
  max: '最大值',
  first: '首值',
  last: '末值',
  percent:'占比',
  none: 'None',
  count: '计数',
  avg: '平均',
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
    `.pos-ag-report-container { font-family: 'Microsoft YaHei', 'Hiragino Sans GB', !important; }`,
    '.ag-pinned-left-cols-container .ag-row { background-color: #f6f8f9; }',
    '.ag-floating-bottom-viewport { font-weight: 600; color: #3b3771; }',
    '.ag-row-footer { background-color: rgba(206, 218, 216, 0.5) !important; font-weight: 600; color: #3b3771;}',
    '.ag-tool-panel .ag-column-select-panel { flex-grow: 1; }',
    '.ag-theme-balham .ag-header { font-weight: 500 }',
    '.ag-body-viewport::-webkit-scrollbar, .ag-column-container::-webkit-scrollbar, .ag-column-drop-list::-webkit-scrollbar { width: 8px; height: 8px; }',
    '.ag-body-viewport::-webkit-scrollbar-thumb, .ag-column-container::-webkit-scrollbar-thumb, .ag-column-drop-list::-webkit-scrollbar-thumb { background-color: #c5c2c2; border-radius: 5px; }',
    '.ag-body-viewport::-webkit-scrollbar-track, .ag-column-container::-webkit-scrollbar-track, .ag-column-drop-list::-webkit-scrollbar-track { box-shadow: inset 0 0 15px lightgray; background-color: #f8f7f7; border-radius: 5px; }',
    `.${cssFeatures.hover} { cursor: pointer; }`,
    `.ag-theme-balham .ag-icon-contracted, .ag-theme-balham .ag-icon-expanded { display: ${options.enableRankColumn ? 'none' : ''} }`
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

const byThousands = (value, decimal) => {
  if (isNaN(value)) { return value }
  const arr = `${value}`.split('.');
  decimal = decimal === undefined && Number(value) % 1 !== 0;
  return decimal ?
    `${Number(arr[0]) >= 0? arr[0].replace(/(?=(?!^)(\d{3})+$)/g, ',') : '-' + String(Math.abs(arr[0])).replace(/(?=(?!^)(\d{3})+$)/g, ',')}.${arr[1] || ''}` :
    `${Number(arr[0]) >= 0? arr[0].replace(/(?=(?!^)(\d{3})+$)/g, ',') : '-' + String(Math.abs(arr[0])).replace(/(?=(?!^)(\d{3})+$)/g, ',')}`;
};

// define some constant for ag report
const AG_REPORT_RANK_COLUMN = {
  colname: 'AG_REPORT_RANK_COLUMN',
  name: '排名'
};

/**
 * @param container // 容器
 * @param opt // 配置项
 * @returns {function(*=, *=)} 函数
 */
const initializeAgReport = (container, opt) => {
  const agReport = (agGridTableContainer, options) => {
    agReport.updateBodyScrollDelay = -1; // 横向滚动延迟计时器
    agReport.autoSizeAllClumnsDelay = -1;
    agReport.autoSizeAllColumnsDelay = -1;
    if (!(agGridTableContainer instanceof HTMLElement)) {
      console.log('agGridTableContainer is not a HTMLElement: agGridTableContainer = ', agGridTableContainer);
      agReport.containerIsNull = true;
      return agReport;
    } else {
      agReport.containerIsNull = false;

      if(opt) {
        agReport.enableExport = options.enableExport || true; // 默认为禁用导出
        agReport.reportMode = options.reportMode || 'normal'; // 默认为普通模式
        agReport.allVisibleColumns = options.allVisibleColumns || []; // 所有允许可见的列
        agReport.displayedColumns = options.displayedColumns || []; // 默认展示的列
        agReport.groupAllowedColumns = options.groupAllowedColumns || []; // 所有允许分组查看的列
        agReport.defaultGroupColumns = options.defaultGroupColumns || []; // 当前默认的分组情况
        agReport.aggregationColumns = options.aggregationColumns || []; // 所有聚合列的信息
        agReport.subTotalColumns = options.subTotalColumns || []; // 哪些列需要在页面内计算合计值
        agReport.enableRankColumn = options.enableRankColumn; // 是否显示排名列
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
      enableSorting: true, // 允许排序
      enableFilter: options && options.enableFilter !== undefined ? options.enableFilter : true, // 是否允许过滤
      enableStatusBar: true, // 当用户在视图区进行区域选择的时候，是否显示所有可计算数据的[平均、求和、计数、最大、最小]等值
      enableRangeSelection: false, // 是否允许进行单元格区域选择
      rowSelection: "multiple", // 行选择模式
      suppressRowClickSelection: true, // 禁用单击事件选中行
      rowDeselection: options && options.rowDeselection !== undefined ? options.rowDeselection : false, // 是否允许按住ctrl + click 取消选中某个已经选中的行
      groupSelectsChildren: options && options.groupSelectsChildren !== undefined? options.groupSelectsChildren : false, // 当进行分组的时候，控制选择分组的行为，是否连带其children一起选中
      defaultColDef: {
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab'],
        suppressMovable: true, // 默认禁用拖拽移动
      }, // 默认列配置
      enableCellChangeFlash: true,
      pivotPanelShow: 'onlyWhenPivoting', // one of ['always','onlyWhenPivoting', 'never'] 表头上方可用于拖拽pivot列的区域
      pivotMode: false, // 透视模式开启
      pivotTotals: false, //透视合计值
      showToolPanel: options.reportMode && options.reportMode !== 'normal', // 显示工具栏
      toolPanelSuppressPivotMode: true, // 禁用pivote mode
      toolPanelSuppressValues: true, // 禁用aggregate value section 面板
      toolPanelSuppressPivots: true, // 禁用 pivot section 面板
      toolPanelSuppressColumnFilter: true, // 禁用columns filter
      toolPanelSuppressColumnSelectAll: true, // 禁用ColumnSelectAll checkbox
      toolPanelSuppressSideButtons: !(options.reportMode && options.reportMode !== 'normal'), // 禁用侧边栏的开关按钮
      groupIncludeFooter: false, // 是否显示分组的footer 合计行
      floatingFilter: options && options.floatingFilter ? options.floatingFilter : true, // 是否显表头下方的浮动筛选框
      rowDragManaged: true,
      rowGroupPanelShow: options && options.rowGroupPanelShow ? options.rowGroupPanelShow : 'never', // 是否显最顶部的group panel ['always', 'onlyWhenGrouping', 'never']
      enterMovesDownAfterEdit: true,
      localeText,
      groupDefaultExpanded: options && options.groupDefaultExpanded ? options.groupDefaultExpanded : 1, // 默认展开几层分组
      autoGroupColumnDef: {
        cellRendererParams:{
          suppressCount: true, // 禁用分组状态下，各个分组行的计数统计
        },
      },
      groupHideOpenParents: true, // 分组隐藏
      groupMultiAutoColumn: true, // 分组时，显示分组原字段
      suppressDragLeaveHidesColumns: true, // 禁用拖拽某列离开表区的时候隐藏该列
      suppressMakeColumnVisibleAfterUnGroup: true, // 顾名思义
      getMainMenuItems() {
        return [
          'pinSubMenu',
          'separator',
          'autoSizeThis',
          'autoSizeAll',
        ];
      }, // 设置每列的general menu item
      getContextMenuItems() {
        const { enableRankColumn, reportMode, enableExport } = agReport;
        let defaultMenu = [
          'copy',
          'copyWithHeaders',
        ];
        if (enableExport) { defaultMenu = defaultMenu.concat(['export']) }
        if (enableRankColumn || reportMode === 'normal') {
          defaultMenu = defaultMenu.concat(['separator', 'expandAll', 'contractAll'])
        }
        return defaultMenu;
      }, // 表体右击菜单
      onGridReady(params) {
        const { columnApi } = params;
        columnApi.autoSizeAllColumns();

        // 替换class = '.ag-column-select-label'的内容，以禁用点击label显示和隐藏列的功能
        agGridDiv.querySelectorAll('.ag-column-select-label').forEach(d => {
          replaceNode(d);
        });

        // 移除class = '.ag-column-select-checkbox' 以免给用户造成困扰
        agGridDiv.querySelectorAll('.ag-column-select-checkbox').forEach(d => {
          d.style.opacity = 0;
          d.style.width = '0';
          d.style.overflow = 'hidden';
        })

        // 处理“工具栏”显示问题，将“工具栏”三个字变为纵向显示
        agGridDiv.querySelectorAll('.ag-side-buttons button').forEach(button => {
          button.style.transform = 'rotate(0) translateY(0px) translateX(-2px)';
          button.innerHTML = '工<br/>具<br/>栏'
        });

      }, // 当表格渲染好之后，触发onGridReady
      onColumnRowGroupChanged() {
        const { enableRankColumn, rowData, api, columnApi } = agReport;
        if (enableRankColumn) {
          let tempKey = '';
          columnApi.getColumnState().some(column => {
            if (column.rowGroupIndex === 1) {
              tempKey = column.colId;
              return true;
            }
          });
          api.setRowData(rowData.map(d => {
            d[AG_REPORT_RANK_COLUMN.colname] = d[tempKey];
            return d;
          }));
        }
        agReport.dealWithPinnedColumns();
        agReport.autoSizeAllColumns();
      }, // 分组变化
      onBodyScroll(params) {
        const { columnApi, direction } = params;
        clearTimeout(agReport.updateBodyScrollDelay);
        if (direction === 'horizontal') {
          agReport.updateBodyScrollDelay = setTimeout(() => {
            columnApi.autoSizeAllColumns();
          }, 10); // 当检测到滚动条为横向滚动时，自适应当前视口范围内的所有列
        }
        agGridTableContainer.setAttribute('data-scroll-left', params.left);
      }, // 当表体发生滚动时候触发该事件
      onColumnValueChanged() {
        agReport.autoSizeAllColumns();
      }, // aggregation 变化
      onRowGroupOpened() {
        agReport.autoSizeAllColumns();
      }, // 分组展开
      onGridSizeChanged() {
        agReport.autoSizeAllColumns();
      }, // 顾名思义
      onModelUpdated(params) {
        params.columnApi.autoSizeAllColumns();
      },
    };

    // 初始化ag grid
    new Grid(agGridDiv, gridOptions);

    const transformColumnDefs = (data) => {
      const { enableRankColumn, aggregationColumns, groupAllowedColumns } = agReport;
      const aggregationColumnsMap = {};
      aggregationColumns.forEach(d => {
        aggregationColumnsMap[d.colname] = d;
      });
      const defaultGroups = enableRankColumn ? [AG_REPORT_RANK_COLUMN.colname].concat(agReport.defaultGroupColumns) : agReport.defaultGroupColumns;
      return data.map(d => {
        const item = {};
        item.headerName = d.name;
        item.field = d.colname;
        item.filter = 'agTextColumnFilter';
        item.unSortIcon = true; // 默认显示unSortIcon 表示此列可以被排序
        item.suppressMovable = true; // 默认禁止拖拽移动
        item.enableRowGroup = false; // 默认禁止row group
        item.suppressToolPanel = true; // 默认禁用所有列的tool panel

        // 处理valueFormatter
        if (d.valueFormatter && typeof d.valueFormatter === 'function') {
          item.valueFormatter = (params) => d.valueFormatter({ value: params.value });
        } else {
          item.valueFormatter = params => {
            const { node, value } = params;
            if (item.field === AG_REPORT_RANK_COLUMN.colname) {
              return node.rowIndex + 1
            } // 当该列为“排名”列时，显示行号

            if (aggregationColumns.map(d => d.colname).indexOf(item.field) !== -1) {
              return `${byThousands(value)}`
            }

            return value || '';
          };
        }

        // 处理cellStyle
        if (aggregationColumns.map(d => d.colname).indexOf(item.field) !== -1) {
          item.cellStyle = (params) => {
            const { value } = params;
            return isNaN(value) ? null : {
              'text-align': 'right'
            };
          };
        }

        // 处理groupAllowedColumns
        if (groupAllowedColumns && groupAllowedColumns.indexOf(item.field) > -1) {
          item.enableRowGroup = true;
          item.suppressToolPanel = false;
        }

        // defaultGroups
        if (defaultGroups && defaultGroups.indexOf(item.field) > -1) {
          item.enableRowGroup = true;
          item.suppressToolPanel = false;
        }

        // 处理allowedAggFuncs | aggFunc | valueGetter
        let aggFieldInfo = null;
        let aggregationAllowed = aggregationColumns.some(d =>{
          if (d.colname === item.field) {
            aggFieldInfo = d;
            return true;
          }
        });
        if (aggregationAllowed) {
          item.enableValue = true;
          item.filter = 'agNumberColumnFilter';
          item.allowedAggFuncs = ['sum', 'count', 'avg', 'max', 'min','percent'];
          item.aggFunc = aggFieldInfo.aggType;
          item.suppressMovable = false;
        }
        return item;
      });
    };

    const transformRowData = (data) => {
      const { subTotalColumns, aggregationColumns } = agReport;
      const aggregationColumnsMap = {};
      aggregationColumns.forEach(d => {
        aggregationColumnsMap[d.colname] = d;
      });
      let rowData = [].concat(data);
      let pinnedBottomRowData = [];
      const subTotalRowObj = {};
      columnApi.getAllColumns().map(d => d.colId).forEach(d => {
        subTotalRowObj[d] = null;
      });

      subTotalColumns.forEach(d => {
        let aggregationFun = 'sum';
        if (aggregationColumnsMap[d].aggType) {
          aggregationFun = aggregationColumnsMap[d].aggType;
        }
        switch (aggregationFun) {
          case 'sum' : {
            let sumValue= data.reduce((accumulator, currentValue) => accumulator + (parseFloat(currentValue[d]) || 0), 0);
            subTotalRowObj[d] =Math.round(sumValue * 100) / 100;
            break;
          }
          case 'count' : {
            subTotalRowObj[d] = data.length || 0;
            break;
          }
          default: break;
        }
      });
      pinnedBottomRowData.push(subTotalRowObj);
      return { rowData, pinnedBottomRowData };
    };

    const { api, columnApi } = gridOptions;
    agReport.api = api;
    agReport.columnApi = columnApi;

    // autoSizeAllColumns
    agReport.autoSizeAllColumns = () => {
      clearTimeout(agReport.autoSizeAllColumnsDelay);
      agReport.autoSizeAllColumnsDelay = setTimeout(() => {
        if (columnApi) {
          columnApi.autoSizeAllColumns();
        }
      }, 10);
    };

    // 处理分组情况
    agReport.dealGroupInfo = () => {
      const { defaultGroupColumns, enableRankColumn } = agReport;
      if (defaultGroupColumns) {
        columnApi.setRowGroupColumns(enableRankColumn ? [AG_REPORT_RANK_COLUMN.colname].concat(defaultGroupColumns) : defaultGroupColumns);
      }
      return agReport;
    };

    // 处理应该显示或应该隐藏的信息
    agReport.dealWithShowedColumns = () => {
      const displayedColumns = agReport.displayedColumns;
      const aggregationColumns = agReport.aggregationColumns;

      // 处理显示隐藏列
      columnApi.setColumnsVisible(columnApi.getColumnState().map(d => d.colId), false); // 隐藏所有列
      columnApi.setColumnsVisible(displayedColumns || [], true); // 显示displayedColumns
      columnApi.setColumnsVisible(aggregationColumns.map(d => d.colname) || [], true); // 显示聚合计算列aggregationColumns
    };

    // 处理pinned columns
    agReport.dealWithPinnedColumns = () => {
      // 获取分组详情
      const columnGroups = columnApi.getColumnState()
        .filter(d => d.rowGroupIndex !== null && d.rowGroupIndex !== undefined)
        .sort((a, b) => a.rowGroupIndex - b.rowGroupIndex )
        .map(d => d.colId);
      columnApi.setColumnsPinned(columnGroups.map(d => `ag-Grid-AutoColumn-${d}`), true);
    };

    // 设置columnDefs
    agReport.setCols = (data) => {
      const { reportMode, enableRankColumn } = agReport;
      if (!data) { return agReport; } // 如果未传参，则返回。
      if (!(Object.prototype.toString.call(data) === '[object Array]')) {
        alert('agReport.setCols requires Array as first param');
        return agReport;
      }
      if (enableRankColumn) {
        api.setColumnDefs(transformColumnDefs([AG_REPORT_RANK_COLUMN].concat(data)));
      } else {
        api.setColumnDefs(transformColumnDefs(data));
      }
      if (reportMode && reportMode !== 'normal') {
        agReport.dealWithShowedColumns();
        agReport.dealGroupInfo();
      }
      return agReport;
    };

    agReport.insertColumn=(t,id,name,cols,rows,fn)=>{
      switch(t){
        case "aggregationColumns":
          agReport.allVisibleColumns.push(id);
          agReport.aggregationColumns.push({colname: id, aggType: "sum"});
          rows.map(function(o){
            fn(o);
          });
          cols.push({colname:id,name:name});
          agReport.setCols(cols).setRows(rows);
          break;
      }
    };

    // 设置rowData
    agReport.setRows = (data) => {
      const  { enableRankColumn, reportMode } = agReport;
      if (!data) { return agReport; } // 如果未传参，则返回。
      if (!(Object.prototype.toString.call(data) === '[object Array]')) {
        alert('agReport.setRows requires Array as first param');
        return agReport;
      }
      const { rowData, pinnedBottomRowData } = transformRowData(data);
      if (enableRankColumn) {
        let tempColumnId = '';
        columnApi.getColumnState().some(column => {
          if (column.rowGroupIndex === 1) {
            tempColumnId = column.colId;
            return true;
          }
        });
        api.setRowData(rowData.map(d => {
          d[AG_REPORT_RANK_COLUMN.colname] = d[tempColumnId];
          return d;
        }));
      } else {
        api.setRowData(rowData);
      }
      if (reportMode === 'rowGroup') {
        api.setPinnedBottomRowData(pinnedBottomRowData);
      }
      agReport.rowData = rowData;
      return agReport;
    };

    // 暴露quickFilter 方法
    agReport.quickFilter = (content) => {
      api.setQuickFilter(content);
      return agReport;
    };

    // autoSizeAllColumns
    agReport.autoSizeAllColumns = () => {
      columnApi.autoSizeAllColumns();
    };

    // 暴露showLoading
    agReport.showLoading = () => {
      api.showLoadingOverlay();
      return agReport;
    };

    // 暴露hideLoading
    agReport.hideLoading = () => {
      api.hideOverlay();
      return agReport;
    };

    // 展开所有
    agReport.expandAll = () => {
      api.expandAll();
      return agReport;
    };

    // 收缩所有
    agReport.collapseAll = () => {
      api.collapseAll();
      return agReport;
    };

    // 暴露销毁方法，释放内存
    agReport.destroy = () => {
      api.destroy();
      return agReport;
    };

    agGridTableContainer.agReport = agReport;
    return agReport;
  };
  return agReport(container, opt);
};

export default initializeAgReport;
