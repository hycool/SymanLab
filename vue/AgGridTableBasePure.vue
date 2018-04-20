<!-- 本组件内的ag-Grid采用pure javascript 实现 -->
<template>
  <div ref="agGridTableContainer"></div>
</template>

<script>
  import { Grid } from 'ag-grid';
  import "../node_modules/ag-grid/dist/styles/ag-grid.css"
  import "../node_modules/ag-grid/dist/styles/ag-theme-balham.css"
  import "ag-grid-enterprise/main";
  import Papa from 'papaparse';
  import localeText from './agGridInternationalization'
  
  let beginTime;
  const headers = [
    '序号', '门店ID', '门店名称', '补货周期', '商品编码', '大类', '商品性质', 'STYLENAME', '上市日期', '上市天数', 'NEWSTYLE', '条码排名', 'SIZEORDER', 'CLR', '颜色', '尺码', '条码', '现零售价', 'SKUFLAG', '前7天销售', '前6天销售', '前5天销售', '前4天销售', '前3天销售', '前2天销售', '前1天销售', '本周销量', '本周销售额', '陈列数量C', '销售目标库存D', '补货目标库存E=MAX(C,D)', '补货计划G=E-F', '在库数量', '在途数量', '店铺库存F', '整款销量', '整款库存', '整款销售金额', '滞销款', 'QTYSAFE1', 'QTYSTOCK1', '停止补货', 'STATE', '退货', 'RETSTATE', '退货数量', '补货', '特殊订单未计入量', '补货天花板A=MIN(A1,A2)', '门店权重系数', 'QTYSTOCKCLR', 'OLDQTYDISPLAY', 'IFMODIFYDISPLAY', 'QTYDISPLAYSTORE', 'QTYPLAN', 'QTYDIFF', '陈列标准', 'REMARK', '推广信息', 'LOWPRICE', 'QTYSTOCKING', 'STYLESALEFLAG', '整款排名', '退仓', '季节', '销售老化款', '款式', '性别', '标准价', '最近铺货日期', 'SPORADICSTYLE', 'MCLASS', '补货推广类型', '过量库存', '天花板上限A2', '其余六天平均B', '周最大日销量A1', 'STYLEATT12', 'PROVINCE', 'SALEAREA', '门店编码', '整款销售状态', 'SKU销售状态', '配销中心', '店铺清理类型', '原陈列数'
  ];

  export default {
    data() {
      const self = this;
      return {
        gridOptions: {
          multiSortKey: 'ctrl',
          animateRows: true,
          // pagination: true,
          // paginationPageSize: 100, // 分页状态下，默认每页显示条目
          enableColResize: true, // 允许用户调整列宽
          enableSorting: true, // 允许按照列值排序
          // suppressAutoSize: true, // 禁止双击某列边缘进行当前列宽自适应
          enableFilter: true, //
          enableStatusBar: true,
          enableRangeSelection: true,
          rowSelection: "multiple",
          rowDeselection: true,
          quickFilterText: null,
          groupSelectsChildren: true,
          defaultColDef: {
            minWidth: 50
          },
          floatingFilter: true,
          enableCellChangeFlash: true,
          rowDragManaged: true,
          rowGroupPanelShow: 'always',
          rowBuffer: 10,
          enterMovesDownAfterEdit: true,
          enterMovesDown: true,
          localeText,
          onGridReady(event) {
            console.log('on grid ready time = ', Date.now());
            const { api, columnApi } = event;
            api.setColumnDefs(self.transformColumnDefs()); // 设置表头信息
            columnApi.autoSizeAllColumns();
          },
        }
      }
    },
    methods: {
      transformColumnDefs() {
        const columnDefs = [];
        headers.forEach(function(d, i) {
          columnDefs.push({
            headerName: d,
            field: 'field' + i,
            editable: true,
            enableRowGroup: true,
          });
        });
        return columnDefs;
      },
      transformRowData(data) {
        console.log('待转换数记录数：', data.length);
        const t = Date.now();
        const rowData = data.map((d, i) => {
          const row = {};
          headers.forEach((hd, hi) => {
            row[`field${hi}`] = d[hi] || '';
          });
          return row;
        });
        console.log('转换 Array 到 JSON 耗时', Date.now() - t, 'ms');
        return rowData;
      },
      initAgGridTable() {
        const agGridDiv = document.createElement('div');
        agGridDiv.style.width = '99%';
        agGridDiv.style.height = '500px';
        agGridDiv.style.margin = '0 auto';
        agGridDiv.setAttribute('class', 'ag-theme-balham');
        this.$refs.agGridTableContainer.appendChild(agGridDiv);
        new Grid(agGridDiv, this.gridOptions);
      },
      fetchCsv() {
        const self = this;
        const beginTime = Date.now();
        const fileIndex = 1;
        fetch(`./csvDataForAgGridTable${fileIndex}.csv`).then((res) => {
          console.log('获取 csv 原始数据耗时： ', Date.now() - beginTime, 'ms');
          res.text().then(data => {
            const t = Date.now();
            Papa.parse(data, {
              complete(result) {
                console.log('转换CSV 到 Array 耗时：', Date.now() - t, 'ms');
                const rowData = self.transformRowData(result.data);
                const beforeTime = Date.now();
                self.gridOptions.api.setRowData(rowData);
                console.log('渲染表格时长 = ', Date.now() - beforeTime);
                console.log('所有时长', Date.now() - beginTime);
              }
            })
          });
        })
      }
    },
    mounted() {
      beginTime = Date.now();
      this.initAgGridTable();
      this.fetchCsv();
    }
  }
</script>

