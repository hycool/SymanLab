import { Grid } from 'ag-grid';
import "../../node_modules/ag-grid/dist/styles/ag-grid.css"
import "../../node_modules/ag-grid/dist/styles/ag-theme-balham.css"
import "ag-grid-enterprise/main";
import { LicenseManager } from "ag-grid-enterprise/main";

// 设置enterprise key
// 以下license key 为研发试用key，有效期到2018-06-06
LicenseManager.setLicenseKey("Evaluation_License_Valid_Until_6_June_2018__MTUyODIzOTYwMDAwMA==4c69615c372b7cdc6c4bda8601ac106b");
const cssFeatures = {
  hover: 'ag-syman-hover',
  imagePreviewBox: 'image-preview-box',
  tooltipBox: 'tooltip-box'
};

const config = {
  smallImageSize: 20, // 图片缩略图最小尺寸
  previewImageSize: 150, // 图片预览图尺寸
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
  columns: '所有列',
  rowGroupColumns: 'Pivot Cols',
  rowGroupColumnsEmptyMessage: '将需要分组查询的“列”拖拽至此处',
  valueColumns: 'Value Cols',
  pivotMode: '透视模式',
  groups: '分组详情',
  values: '聚合分析值',
  pivots: 'laPivots',
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
  sum: '求和',
  min: '最小值',
  max: '最大值',
  first: '首值',
  last: '末值',
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

const setCommonStyles = () => {
  const commonStyles = document.createElement('style');
  const styleArray = [
    `.ag-column-tool-panel-item { display: none; } .ag-filter-body { padding-left: 4px }`, // 禁止隐藏全部列
    `.${cssFeatures.hover} { cursor: pointer; }`,
    `.${cssFeatures.imagePreviewBox} {
      width: ${config .previewImageSize}px; 
      height: ${config.previewImageSize}px; 
      border: 0px solid black; 
      position: absolute; 
      bottom: 0; 
      right: 10000px; 
      background-color: #fff; 
      z-index: 999999; 
      box-shadow: 0 0 1px gray;
      transition-duration: 0.3s; 
    }`,
    `.${cssFeatures.tooltipBox} { 
        background-color: black; 
        position: absolute;
        z-index: 99999;
        color: #fff; 
        font-size: 12px; 
        padding: 5px 10px;
        border-radius: 4px;
        display: block;
        border: 1px solid black;
        max-width: 200px;
        word-break: break-all;
        text-align: center;
        left: -10000px;
    }`,
    `.${cssFeatures.tooltipBox}::before {
        display: block;
        content: '';
        top: 8px;
        float: left;
        position: absolute;
        left: -11px;
        border-right: 5px solid black;
        border-left: 5px solid transparent;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
    }`
  ];
  commonStyles.innerHTML = styleArray.join('\r\n');
  return commonStyles;
};

//for image
const imageComponent = function() {};

imageComponent.prototype.init = function(params) {
  const eGui = document.createElement('div');
  eGui.style.height = '100%';
  eGui.style.position = 'relative';
  this.eGui = eGui;
  let url = '';
  try {
    url = JSON.parse(params.value)[0].URL;
  } catch (e) {
    url = params.value;
  }
  const imgSmall = document.createElement('img');
  imgSmall.style.width = `${config.smallImageSize}px`;
  imgSmall.style.height = `${config.smallImageSize}px`;
  imgSmall.setAttribute('class', cssFeatures.hover);
  imgSmall.style.verticalAlign = 'middle';
  imgSmall.onmouseenter = function(e) {
    const { target } = e;
    const { agGridDiv, imagePreviewBox } = params;
    // 递归处理方式，这种方式不适用与ag-Grid中将某一列拖拽至最后一列的情况
    // let offsetLeft = 0;
    // const getOffsetLeftBaseRoot = (node) => {
    //   offsetLeft += node.offsetLeft;
    //   if (node.offsetParent && node.offsetParent !== agGridDiv) {
    //     getOffsetLeftBaseRoot(node.offsetParent);
    //   }
    // };
    // getOffsetLeftBaseRoot(target);
    const offsetLeft = target.getBoundingClientRect().left - agGridDiv.getBoundingClientRect().left;
    const offsetTop = target.getBoundingClientRect().top - agGridDiv.getBoundingClientRect().top;
    imagePreviewBox.childNodes[0].setAttribute('src', `${url}?x-oss-process=image/resize,w_${config.previewImageSize}`);
    imagePreviewBox.style.display = '';
    imagePreviewBox.style.opacity = 1;
    imagePreviewBox.style.left = `${offsetLeft + (config.smallImageSize * 2)}px`;
    imagePreviewBox.style.top = `${
    offsetTop - (config.previewImageSize - config.smallImageSize) / 2}px`;
  };
  imgSmall.onmouseleave = function() {
    const { imagePreviewBox } = params;
    imagePreviewBox.style.opacity = 0;
    imagePreviewBox.style.display = 'none';
  };
  if(params.value && url && url !== '') {
    imgSmall.setAttribute('src', `${url}?x-oss-process=image/resize,w_${config.smallImageSize}`);
    eGui.appendChild(imgSmall);
  }
};

imageComponent.prototype.getGui = function () {
  return this.eGui;
};

// for fk
const fkComponent = function() {};

fkComponent.prototype.init = function(params) {
  const eGui = document.createElement('span');
  this.eGui = eGui;
  const { value } = params;
  // 设置fk icon 的样式
  const template = value !== null && value !== '' ?
    `<i class="iconfont ${ cssFeatures.hover }" data-target-tag="fkIcon" style="color: #0f8ee9">&#xe625;</i>${params.value || ''}` :
    '';
  if (params.data.ID.val !== '合计') {
    eGui.innerHTML = template;
  }
};

fkComponent.prototype.getGui = function() {
  return this.eGui;
};

// for customerurl
const customerUrlComponent = function() {};

customerUrlComponent.prototype.init = function(params) {
  const eGui = document.createElement('span');
  this.eGui = eGui;
  const template = `<span class="${cssFeatures.hover}" style="text-decoration: underline" data-target-tag="customerUrlText">${params.value || ''}</span>`;
  eGui.innerHTML = template;
};

customerUrlComponent.prototype.getGui = function() {
  return this.eGui;
};

// for sequence component 错误信息提示tooltip
const sequenceComponent = function() {};

sequenceComponent.prototype.init = function(params) {
  const { agGridDiv, tooltipBox, options, value, failIds } = params;
  const eGui = document.createElement('span');
  this.eGui = eGui;
  const valueOfId = params.data.ID.val;
  const template = valueOfId === '合计' || valueOfId === '统计' ? valueOfId :`<span style="color: #0f8ee9" data-target-tag="rowIndex">${params.rowIndex + 1 + params.options.datas.start}</span>`;
  eGui.innerHTML = template;

  // for tooltip icon
  if (failIds.indexOf(value) > -1) {
    const toolTipIcon = document.createElement('i');
    toolTipIcon.setAttribute('class', `iconfont ${cssFeatures.hover}`);
    toolTipIcon.style.color = 'red';
    toolTipIcon.innerHTML = '&#xe61b;';
    toolTipIcon.onmouseenter = function(e) {
      const { target } = e;
      const offsetLeft = target.getBoundingClientRect().left - agGridDiv.getBoundingClientRect().left;
      const offsetTop = target.getBoundingClientRect().top - agGridDiv.getBoundingClientRect().top;
      tooltipBox.style.display = '';
      tooltipBox.style.left = `${offsetLeft + 20}px`;
      tooltipBox.style.top = `${offsetTop - (target.offsetHeight / 2)}px`;
      if (options && options.datas && options.datas.deleteFailInfo && Object.prototype.toString.call(options.datas.deleteFailInfo) === '[object Array]') {
        tooltipBox.innerText = options.datas.deleteFailInfo[failIds.indexOf(value)].message;
      }
    };
    toolTipIcon.onmouseleave = function() {
      tooltipBox.style.display = 'none';
    };
    eGui.appendChild(toolTipIcon);
  }

};

sequenceComponent.prototype.getGui = function() {
  return this.eGui;
};

// for header component
const customHeader = function() {}

customHeader.prototype.init = function(params) {
  const { displayName, enableMenu, enableSorting, column, agGridDiv, tooltipBox } = params;
  this.params = params;
  const eGui = document.createElement('div');
  this.eGui = eGui;
  eGui.setAttribute('class', 'ag-cell-label-container');
  eGui.innerHTML = `
    <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" style="opacity: 0">
      <span class="ag-icon ag-icon-menu"></span>
    </span>
    <div ref="eLabel" class="ag-header-cell-label" role="presentation">
        <span ref="eText" class="ag-header-cell-text" role="columnheader">
          ${params.column.colDef.comment ? `<i class="icon-font comment ${cssFeatures.hover}" style="color: orangered">&#xe640;</i>` : ''} ${displayName}
        </span>
        <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>
        <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon ${params.column.colDef.sort === 'asc' ? '' : 'ag-hidden'}" >
          <span class="ag-icon ag-icon-asc"></span>
        </span>
        <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon ${params.column.colDef.sort === 'desc' ? '' : 'ag-hidden'}" >
          <span class="ag-icon ag-icon-desc"></span>
        </span>
        <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon ${!params.column.colDef.sort && params.column.colDef.isorder ? '' : 'ag-hidden'}" >
          <span class="ag-icon ag-icon-none"></span>
        </span>
    </div>
  `;
  this.eMenuButton = eGui.querySelector('.ag-header-cell-menu-button');
  this.eSortOrderAsc = eGui.querySelector('.ag-sort-ascending-icon');
  this.eSortOrderDesc = eGui.querySelector('.ag-sort-descending-icon');
  this.eSortNone = eGui.querySelector('.ag-sort-none-icon');
  this.eComment = eGui.querySelector('i.comment');

  if (this.eComment) {
    this.eComment.onmouseenter = (e) => {
      const { target } = e;
      const offsetLeft = target.getBoundingClientRect().left - agGridDiv.getBoundingClientRect().left;
      const offsetTop = target.getBoundingClientRect().top - agGridDiv.getBoundingClientRect().top;
      tooltipBox.style.display = '';
      tooltipBox.style.left = `${offsetLeft + 20}px`;
      tooltipBox.style.top = `${offsetTop - 5}px`;
      tooltipBox.innerText = column.colDef.comment;
    };
    this.eComment.onmouseleave = () => {
      tooltipBox.style.display = 'none';
    };
  }

  // 处理column menu:hover
  eGui.onmouseenter = () => { this.eMenuButton.style.opacity = 1; };
  eGui.onmouseleave = () => { this.eMenuButton.style.opacity = 0; };

  // 处理column menu
  if (enableMenu) {
    this.onMenuClickListener = this.onMenuClick.bind(this);
    this.eMenuButton.addEventListener('click', this.onMenuClickListener);
  }

  // 处理label click
  this.onHeaderClickListener = this.onHeaderClick.bind(this);
  eGui.addEventListener('click', this.onHeaderClickListener);

  // 处理排序信息
  if (enableSorting) {
    this.onSortChangeListener = this.onSortChanged.bind(this);
    column.addEventListener('sortChanged', this.onSortChangeListener);
  }
};

customHeader.prototype.onMenuClick = function () {
  this.params.showColumnMenu(this.eMenuButton);
};

customHeader.prototype.onHeaderClick = function(event) {
  this.params.progressSort(event.shiftKey);
};

customHeader.prototype.onSortChanged = function() {
  const { column } = this.params;
  const { eSortOrderAsc, eSortOrderDesc, eSortNone } = this;
  const sortState = column.getSort();
  if (sortState === 'asc') {
    eSortOrderAsc.classList.remove('ag-hidden');
  } else {
    eSortOrderAsc.classList.add('ag-hidden');
  }

  if (sortState === 'desc') {
    eSortOrderDesc.classList.remove('ag-hidden');
  } else {
    eSortOrderDesc.classList.add('ag-hidden');
  }

  if (sortState === null && column.colDef.isorder) {
    // 只有当此列允许排序，并且当前排序模式为null时，则显示图标
    eSortNone.classList.remove('ag-hidden');
  } else {
    eSortNone.classList.add('ag-hidden');
  }
};

customHeader.prototype.getGui = function() {
  return this.eGui;
};

customHeader.prototype.destroy = function() {
  if (this.onMenuClickListener) {
    this.eMenuButton.removeEventListener('click', this.onMenuClickListener);
  }
  this.params.column.removeEventListener('sortChanged', this.onSortChangeListener);
  this.eGui.removeEventListener('click', this.onHeaderClickListener);
};

// 公共方法
const cleanChildNode = (node) => {
  // 清空agGridTableContainer
  while(node && node.firstChild) { node.removeChild(node.firstChild); }
};

const currencyFormat = (value) => {
  const arr = `${value}`.split('.');
  return `${arr[0].replace(/(?=(?!^)(\d{3})+$)/g, ',')}.${arr[1] || ''}`;
};


/**
 * @param agGridTableContainer // 容器
 * @param options // 配置项
 * @returns {function(*=, *=)} 函数
 */
const agTable = (agGridTableContainer, options) => {
  if (!(agGridTableContainer instanceof HTMLElement)) {
    alert('agGridTableContainer is not a HTMLElement');
    return null;
  }
  cleanChildNode(agGridTableContainer); // 清空agGridTableContainer节点

  // 处理deleteFailInfo
  const failIds = [];
  if (options && options.datas && options.datas.deleteFailInfo && options.datas.deleteFailInfo && Object.prototype.toString.call(options.datas.deleteFailInfo) === '[object Array]') {
    options.datas.deleteFailInfo.forEach(d => {
      if (d.objid && d.objid !== '') {
        failIds.push(d.objid);
      }
    });
  }

  let zhColumnNameMap = {}; // 每列的中文字段名映射，形如{ '中文字段名': 'english_name' }
  const agGridDiv = document.createElement('div');

  // 图片预览框
  const imagePreviewBox = document.createElement('div');
  imagePreviewBox.innerHTML = '<img alt="" style="width: 100%; height: 100%" />'
  imagePreviewBox.setAttribute('class', cssFeatures.imagePreviewBox);

  // 自定义tooltip
  const tooltipBox = document.createElement('div');
  tooltipBox.setAttribute('class', cssFeatures.tooltipBox);

  agGridDiv.style.width = '100%';
  agGridDiv.style.height = '100%';
  agGridDiv.style.margin = '0 auto';
  agGridDiv.style.position = 'relative';
  agGridDiv.setAttribute('class', 'ag-theme-balham');  // 设置主题
  agGridTableContainer.appendChild(agGridDiv);
  // 设置通用样式
  agGridDiv.appendChild(setCommonStyles());

  // 列组件筛选器
  const componentPicker = (columnItem) => {
    if (columnItem.colname === 'ID') {

      return 'sequenceComponent';
      /*
      return function (params) {
        return params.value === '合计' || params.value === '统计' ?
          params.value :
          `<span style="color: #0f8ee9" data-target-tag="rowIndex">${params.rowIndex + 1 + options.datas.start}</span>`
      }
      */
    }
    if (columnItem.customerurl) {
      return 'customerUrlComponent'
    }
    if (columnItem.isfk) {
      return 'fkComponent';
    }
    if (columnItem.display === 'image') {
      return 'imageComponent'
    }
    return null;
  };

  // 处理列数据
  const transformColumnDefs = (data) => {
    let hideColumn = [];
    if (options && options.datas && options.datas.hideColumn) {
      hideColumn = [].concat(options.datas.hideColumn.split(','));
    }

    // ---------- 处理默认排序 ---------------
    const defaultSortKeyMap = {};
    if (options && options.datas && options.datas.ordids && Object.prototype.toString.call(options.datas.ordids) === '[object Array]') {
      options.datas.ordids.forEach(d => {
        if (d.colname !== 'ID') {
          // 不处理ID列的默认排序显示
          defaultSortKeyMap[d.colname] = d.ordasc ? 'asc' : 'desc';
        }
      });
    }

    // ----------for menu tabs begin---------------
    const columnMenus = {
      generalMenuTab: options && options.generalMenuTab ? options.generalMenuTab : true, // generalMenuTab： 通用菜单，用于显示自适应之类的功能菜单
      filterMenuTab: options && options.filterMenuTab ? options.filterMenuTab : true, // filterMenuTab：列值过滤器
      columnsMenuTab: options && options.columnsMenuTab ? options.columnsMenuTab : true, // columnsMenuTab：列名过滤器
    };
    const menuTabs = [];
    ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'].forEach(tab => {
      if (columnMenus[tab]) {
        menuTabs.push(tab);
      }
    });
    // ----------for menu tabs end---------------

    const cols = data.map(d => {
      if(d.colname === 'headerName') { alert(`headerName : 列名冲突`) }
      if(d.colname === 'field') { alert('field : 列名冲突'); }
      const item = JSON.parse(decodeURI(encodeURI(JSON.stringify(d))));
      item.headerName = d.colname === 'ID' ? '序号' : d.name || '未定义';
      item.headerComponent = 'customHeader';
      item.headerComponentParams = { agGridDiv, tooltipBox };
      item.field = `${d.colname}.val`; // 参与显示和计算的列值
      item.colId = d.colname; // 每一列的ID，默认和item.field一致。
      item.sort = defaultSortKeyMap[d.colname]; // 设置默认排序列
      item.suppressFilter= !d.isfilter; // 根据d.isfilter 判断是否需要禁用浮动框
      item.cellRenderer = componentPicker(item);
      item.cellRendererParams = {
        agGridDiv,
        imagePreviewBox,
        options,
        tooltipBox,
        failIds,
      }; // 在cell rendering 中自定义一个agGridDiv 用于以后的寻根定位
      item.sortingOrder = item.isorder ? ['asc', 'desc', null] : [null]; // 处理每列默认的单击后的排序顺序
      item.unSortIcon = item.isorder; // 设置未排序图表Icon
      item.hide = hideColumn.indexOf(item.colname) > -1;
      /*
       // 暂时不做单元格颜色控制，改为行颜色控制
       item.cellClass = function(params) {
       let className = '';
       const { cssStatus } = options;
       if (options.cssStatus) {
       const { colDef, value } = params;
       const { headerName } = colDef;
       cssStatus.some(d => {
       if (d.desc === headerName) {
       className = d.css[d.value.indexOf(value)];
       return true;
       }
       });
       }
       return className;
       }; // 单元格class
       */
      // item.cellStyle = function(params) {
      //   if(params.column.colId === 'ID') {
      //     // 如果colId === 'ID'，则将单元格overflow：hidden 属性放开
      //     return {
      //       overflow: 'auto',
      //     }
      //   }
      // };
      item.suppressMenu = false; // 是否禁用每一列的菜单选择
      item.menuTabs = menuTabs; // 处理每列菜单情况
      if (item.type.toLocaleLowerCase() === 'number') {
        item.filter = 'number'
      }
      if (item.type.toLocaleLowerCase() === 'string') {
        item.filter = 'text'
      }
      item.checkboxSelection = d.colname === 'ID' ? function (params) {
        return params.data.ID.val !== '合计' && params.data.ID.val !== '统计' && params.columnApi.getRowGroupColumns().length === 0;
      } : null;
      item.headerCheckboxSelection = d.colname === 'ID' ? function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      } : null;
      item.headerCheckboxSelectionFilteredOnly = d.colname === 'ID';
      // 最后处理zhColumnNameMap
      zhColumnNameMap[item.headerName] = d.colname;
      return item;
    });
    return cols;
  };

  // 处理行数据
  const transformRowData = (data) => {
    let rowData = data;
    let fullRangeSubTotalRow = null;
    let isFullRangeSubTotalEnabled = null;
    let isSubTotalEnabled = null;
    let subtotalRow = null;
    if (options.datas) {
      const { datas } = options;
      fullRangeSubTotalRow = datas.fullRangeSubTotalRow;
      isFullRangeSubTotalEnabled = datas.isFullRangeSubTotalEnabled;
      isSubTotalEnabled = datas.isSubTotalEnabled;
      subtotalRow = datas.subtotalRow;
    }

    // 计算合计值
    if(isSubTotalEnabled) {
      const subtotalRowData = {};

      // 前端计算合计值
      const sumField = [];
      columnApi.getAllColumns().forEach(d => {
        subtotalRowData[d.colDef.colname] = { val: '' };
        if (d.colDef.type && d.colDef.type.toLocaleLowerCase() === 'number') {
          sumField.push(d.colDef.colname);
        }
      });
      sumField.forEach(field => {
        subtotalRowData[field].val = data.reduce(function(sum, row) {
          return sum + (parseFloat(`${row[field].val}`.replace(/\,/g, '')) || 0)
        }, 0);
        subtotalRowData[field].val = currencyFormat(subtotalRowData[field].val.toFixed(2));
      });
      subtotalRowData.ID.val = '合计';


      //subtotalRow 计算合计值
      /*
      columnApi.getAllColumns().forEach((d, i) => {
        const { colname } = d.colDef;
        subtotalRowData[colname] = { val: colname === 'ID' ? '合计' : (subtotalRow[i] || '') };
      });
      */
      rowData = rowData.concat([subtotalRowData]);
    }

    // 计算统计值
    if(isFullRangeSubTotalEnabled) {
      const fullRangeSubTotalRowData = {};
      columnApi.getAllColumns().forEach((d, i) => {
        const { colname } = d.colDef;
        fullRangeSubTotalRowData[colname] = { val: colname === 'ID' ? '统计' : (fullRangeSubTotalRow[0][i] || '') };
      });
      rowData = rowData.concat([fullRangeSubTotalRowData]);
    }

    return rowData;
  };

  const gridOptions = {
    columnDefs: options && options.columnDefs ? options.columnDefs : [], // 列定义
    rowData : options && options.rowData ? options.rowData : [],// 行数据
    multiSortKey: 'ctrl', // 多列排序组合键（按下ctrl + 鼠标点击某一列）
    animateRows: true, // 显示row动画
    pagination: options && options.pagination ? options.pagination : false, // 是否启用分页
    paginationPageSize: options && options.paginationPageSize ? options.paginationPageSize : 10, // 分页状态下，默认每页显示条目
    enableColResize: options && options.enableColResize ? options.enableColResize : true, // 允许用户调整列宽
    enableSorting: options && options.enableSorting ? options.enableSorting : true,// 允许按照列值排序
    suppressAutoSize: options && options.suppressAutoSize ? options.suppressAutoSize : false, // 禁止双击某列边缘进行当前列宽自适应
    enableFilter: options && options.enableFilter ? options.enableFilter : true, // 是否允许过滤
    toolPanelSuppressSideButtons: options && options.toolPanelSuppressSideButtons ? options.toolPanelSuppressSideButtons : true,
    enableStatusBar: options && options.enableStatusBar ? options.enableStatusBar : false, // 当用户在视图区进行区域选择的时候，是否显示所有可计算数据的[平均、求和、计数、最大、最小]等值
    enableRangeSelection: options && options.enableRangeSelection ? options.enableRangeSelection : false, // 是否允许进行单元格区域选择
    rowSelection: "multiple", // 行选择模式
    rowDeselection: options && options.rowDeselection ? options.rowDeselection : false, // 是否允许按住ctrl + click 取消选中某个已经选中的行
    quickFilterText: null,
    groupSelectsChildren: options && options.groupSelectsChildren ? options.groupSelectsChildren : false, // 当进行分组的时候，控制选择分组的行为，是否连带其children一起选中
    defaultColDef: {
      // minWidth: options && options.minWidth ? options.minWidth : 100,
      comparator: options && options.sortByLocal ? null : function() {return 0; },
    }, // 默认列配置
    enableCellChangeFlash: true,
    floatingFilter: options && options.floatingFilter ? options.floatingFilter : true, // 是否显表头下方的浮动筛选框
    rowDragManaged: true,
    rowGroupPanelShow: options && options.rowGroupPanelShow ? options.rowGroupPanelShow : 'onlyWhenGrouping', // 是否显最顶部的group panel
    rowBuffer: 10,
    enterMovesDownAfterEdit: true,
    enterMovesDown: true,
    localeText,
    components: {
      imageComponent,
      fkComponent,
      customerUrlComponent,
      sequenceComponent,
      customHeader
    },
    getContextMenuItems() {
      return [
        'copy',
        'copyWithHeaders',
        'paste',
        'export',
      ];
    }, // 表体右击菜单
    getMainMenuItems() {
      return [
        'pinSubMenu',
        'separator',
        'autoSizeThis',
        'autoSizeAll',
        'separator',
        'resetColumns'
      ];
    }, // 设置每列的general menu item
    onCellClicked(params) {
      const { colDef, data, event } = params;
      if (typeof options.cellSingleClick === 'function') {
        options.cellSingleClick(colDef, data, event.target);
      }
    }, // 单元格单击
    onCellDoubleClicked(params) {
      const { colDef, data, event } = params;
      if (typeof options.cellSingleClick === 'function') {
        options.cellDoubleClick(colDef, data, event.target);
      }
    }, // 单元格双击
    onRowClicked(params) {
      const { colDef, data, event } = params;
      if (typeof options.rowSingleClick === 'function') {
        options.rowSingleClick(colDef, data, event.target);
      }
    }, // 行单击,
    onSelectionChanged(params) {
      if (typeof options.onSelectionChanged === 'function') {
        const ids = [];
        params.api.getSelectedRows().forEach(d => {
          const { val } = d.ID;
          if (val !== '合计' && val !== '统计') {
            ids.push(val);
          }
        });
        options.onSelectionChanged(ids);
      }
    }, // 行选中事件
    onRowDoubleClicked(params) {
      const { colDef, data, event } = params;
      if (typeof options.rowDoubleClick === 'function') {
        options.rowDoubleClick(colDef, data, event.target);
      }
    }, // 行双击
    onSortChanged(params) {
      const { api } = params;
      if (typeof options.onSortChanged === 'function') {
        if (api.getSortModel().length !== 0) {
          options.onSortChanged(api.getSortModel());
        }
      }
    }, // 响应排序事件
    onGridReady(params) {
      const { columnApi } = params;
      // 自适应所有列
      columnApi.autoSizeAllColumns();
      agGridDiv.appendChild(imagePreviewBox);
      agGridDiv.appendChild(tooltipBox);
    }, // 当表格渲染好之后，触发onGridReady
    onBodyScroll(params) {
      const { columnApi, direction } = params;
      if (direction === 'horizontal' && options.autoSizeWhenScroll) {
        setTimeout(() => {
          columnApi.autoSizeAllColumns();
        }, 0); // 当检测到滚动条为横向滚动时，自适应当前视口范围内的所有列
      }
    }, // 当表体发生滚动时候触发该事件
    onVirtualColumnsChanged(params) {}, // 当列很多时，如果用户横向拉动混动条以查看其它不在视口区域的列，则会触发此事件
    onColumnVisible(params) {
      if (typeof options.onColumnVisibleChanged === 'function') {
        options.onColumnVisibleChanged(params.columns[0].colId, params.visible);
      }
    },
    getRowClass(params) {
      let className = '';
      const { data } = params;
      if (options.cssStatus) {
        options.cssStatus.forEach(d => {
          if (zhColumnNameMap[d.desc]) {
            const columnName = zhColumnNameMap[d.desc]; // 与d.desc所述中文字段相匹配的英文字段名
            const columnValueOfCurrentRow = data[columnName].val; // 与d.desc所述中文字段相匹配的当前行的columnName的取值
            className += `${d.css[d.value.indexOf(columnValueOfCurrentRow)] || ''} ` || ' ';
          }
        });
      }
      return className;
    }, // 处理行级样式
  };

  // 初始化ag grid
  new Grid(agGridDiv, gridOptions);

  const { api, columnApi } = gridOptions;
  agTable.api = api;
  agTable.columnApi = columnApi;
  // 设置columnDefs
  agTable.setCols = (data) => {
    if (!data) { return agTable; } // 如果未传参，则返回。
    if (!(Object.prototype.toString.call(data) === '[object Array]')) {
      alert('agTable.setCols requires Array as first param');
      return agTable;
    }
    api.setColumnDefs(transformColumnDefs(data));
    return agTable;
  };

  // 设置rowData
  agTable.setRows = (data) => {
    if (!data) { return agTable; } // 如果未传参，则返回。
    if (!(Object.prototype.toString.call(data) === '[object Array]')) {
      alert('agTable.setRows requires Array as first param');
      return agTable;
    }
    api.setRowData(transformRowData(data));
    return agTable;
  };

  // 设置默认排序规则
  agTable.setSortModel = (data) => {
    if (!data) { return agTable; } // 如果未传参，则返回。
    // data: [{ colId: 'IMAGE', sort: 'asc' }]
    if (!(Object.prototype.toString.call(data) === '[object Array]')) {
      alert('agTable.setSortModel requires Array as first param');
      return agTable;
    }
    api.setSortModel(data);
  };

  return agTable;
};

export default agTable;
