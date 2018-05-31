<!-- 本组件内的ag-Grid采用pure javascript 实现 -->
<template>
  <div>
    <div v-if="enableAgTable" ref="agGridTableContainer2" style="width: 100%; height: 540px;border: 0px solid black; margin: 0 auto; display: flex;">
      <p style="margin-top: 30px; text-align: center;">Loading...</p>
    </div>
    <div v-if="enableAgTable" style="width: 100%; height: 30px;"></div>
    <div v-if="enableAgReport" ref="agGridReport" style="width: 100%; height: 700px; border: 0px solid black; margin: 0 auto;">
      <p style="margin-top: 30px; text-align: center;">Loading...</p>
    </div>
  </div>
</template>

<script>
  import Papa from 'papaparse';
  import agTable from './utility/ag-grid/ag-grid-table-pure';
  import agReport from './utility/ag-grid-report-pure';
  import AgGridTableBaseWrapper from './AgGridTableBaseWrapper.vue';
  import mock from 'mockjs';
  const headers = [
    '序号', '门店ID', '门店名称', '补货周期', '商品编码', '大类', '商品性质', 'STYLENAME', '上市日期', '上市天数', 'NEWSTYLE', '条码排名', 'SIZEORDER', 'CLR', '颜色', '尺码', '条码', '现零售价', 'SKUFLAG', '前7天销售', '前6天销售', '前5天销售', '前4天销售', '前3天销售', '前2天销售', '前1天销售', '本周销量', '本周销售额', '陈列数量C', '销售目标库存D', '补货目标库存E=MAX(C,D)', '补货计划G=E-F', '在库数量', '在途数量', '店铺库存F', '整款销量', '整款库存', '整款销售金额', '滞销款', 'QTYSAFE1', 'QTYSTOCK1', '停止补货', 'STATE', '退货', 'RETSTATE', '退货数量', '补货', '特殊订单未计入量', '补货天花板A=MIN(A1,A2)', '门店权重系数', 'QTYSTOCKCLR', 'OLDQTYDISPLAY', 'IFMODIFYDISPLAY', 'QTYDISPLAYSTORE', 'QTYPLAN', 'QTYDIFF', '陈列标准', 'REMARK', '推广信息', 'LOWPRICE', 'QTYSTOCKING', 'STYLESALEFLAG', '整款排名', '退仓', '季节', '销售老化款', '款式', '性别', '标准价', '最近铺货日期', 'SPORADICSTYLE', 'MCLASS', '补货推广类型', '过量库存', '天花板上限A2', '其余六天平均B', '周最大日销量A1', 'STYLEATT12', 'PROVINCE', 'SALEAREA', '门店编码', '整款销售状态', 'SKU销售状态', '配销中心', '店铺清理类型', '原陈列数'
  ];

  let beforeMountTime = Date.now();
  window.beforeMountTime = beforeMountTime;
  
  export default {
    name: 'AgGridTableBasePure-Staging',
    data() {
      return {
        enableAgTable: false,
        enableAgReport: true,
        cols: [],
        rows: [],
        agInstance: null,
      };
    },
    components: {
      'ag-grid-table-base-wrapper': AgGridTableBaseWrapper
    },
    methods: {
      mockColumnDefs() {
        const columnDefs = [
          {
            headerName: '姓名',
            field: 'name',
            enableRowGroup: true,
            rowDrag: true,
            width: 150,
            checkboxSelection: function (params) {
              return params.columnApi.getRowGroupColumns().length === 0;
            }, // 设置单元格的checkbox
            headerCheckboxSelection: function (params) {
              return params.columnApi.getRowGroupColumns().length === 0;
            },  // 设置表头的checkbox
            headerCheckboxSelectionFilteredOnly: true, // 只选中在过滤条件内的数据
          },
          {
            headerName: '国家',
            field: 'country',
            enableRowGroup: true,
            width: 100,
          },
          {
            headerName: '游戏名称',
            field: 'game',
            enableRowGroup: true,
            width: 100
          },
          {
            headerName: '是否购买',
            field: 'bought',
            enableRowGroup: true,
            width: 100,
            cellRenderer(params) {
              const { data, columnApi } = params;
              if (columnApi.getRowGroupColumns().length === 0) {
                return data.bought ? '√' : '×'
              }
            }
          },
          {
            headerName: '余额',
            field: 'bankBalance',
            width: 100
          },
          {
            headerName: '年度合计',
            width: 100,
            cellRenderer(params) {
              const data = params.data;
              if (params.columnApi.getRowGroupColumns().length === 0) {
                return data.m1 + data.m2 + data.m3 + data.m4 + data.m5 + data.m6 + data.m7 + data.m8 + data.m9 + data.m10 + data.m11 + data.m12;
              }
            }
          },
          {
            headerName: '月份',
            children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(d => ({
              headerName: `${d}月`,
              field: `m${d}`,
              enableValue: true,
              width: 100
            }))
          }
        ];
        return columnDefs;
      },
      mockRowData() {
        const mockNumber = () => Math.round(Math.random() * 10000);
        const country = ['中国', '英国', '法国', '希腊', '南非', '以色列', '德国', '美国', '日本', '阿联酋'];
        const game = ['游戏一', '游戏二', '游戏三', '游戏四', '游戏五', '游戏六', '游戏七', '游戏八', '游戏九'];
        const rowData = [];
        const row = 100 * 100;
        for(let i = 0; i < row; i++) {
          rowData.push({
            name: mock.Random.cname(),
            country: { val: country[Math.round(Math.random() * 100) % country.length] },
            game: game[Math.round(Math.random() * 100) % game.length],
            bought: (Math.round(Math.random() * 100) % 2) === 0,
            bankBalance: mockNumber(),
            m1: mockNumber(),
            m2: mockNumber(),
            m3: mockNumber(),
            m4: mockNumber(),
            m5: mockNumber(),
            m6: mockNumber(),
            m7: mockNumber(),
            m8: mockNumber(),
            m9: mockNumber(),
            m10: mockNumber(),
            m11: mockNumber(),
            m12: mockNumber(),
          });
        }
        return rowData;
      },
      mockDemo() {
        agTable(this.$refs.agGridTableContainer)
          .setRows(this.mockRowData())
          .setCols(this.mockColumnDefs());
      },
      
      /**
       * gridOptions.columenDefs 转换函数
       * @returns {Array}
       */
      transformColumnDefs() {
        const columnDefs = [];
        headers.forEach(function(d, i) {
          columnDefs.push({
            headerName: d,
            field: 'field' + i,
          });
        });
        return columnDefs;
      },
      
      /**
       * gridOptions.rowData 转换函数
       * @param data
       * @returns {Array}
       */
      transformRowData(data) {
        const beforeTransformTime = Date.now();
        const rowData = data.map(d => {
          const row = {};
          headers.forEach((hd, hi) => {
            row[`field${hi}`] = d[hi] || '';
          });
          return row;
        });
        console.log('转换Array to Json 耗时：', Date.now() - beforeTransformTime);
        return rowData;
      },

      /**
       * 模拟网络数据请求
       */
      fetchCsv() {
        const beforeFetchTime = Date.now();
        const self = this;
        const fileIndex = 1; // fileIndex
        fetch(`./assets/csvDataForAgGridTable${fileIndex}.csv`).then((res) => {
          console.log('fetchCsv耗时：', Date.now() - beforeFetchTime);
          res.text().then(data => {
            const beforeParseTime = Date.now();
            Papa.parse(data, {
              complete(result) {
                console.log('转换 Csv To Array 耗时：', Date.now() - beforeParseTime );
                const rowData = self.transformRowData(result.data);
                const columnDefs = self.transformColumnDefs();
                agReport(self.$refs.agGridReport, {
                  defaultGroupColumns: ["field2", "field6", "field5", "field15"],
                  aggregationColumns: ['field9', 'field17', 'field26', 'field27'],
                })
                  .setCols(columnDefs)
                  .setRows(rowData);
              }
            })
          });
        })
      },
      
      /**
       * 模拟FC商品标准档案接口
       */
      fetchFCData() {
        const self = this;
        fetch('./assets/fc.data2.json').then(res => {
          res.json().then(data => {
            const { tabth, row } = data.datas;
            data.datas.deleteFailInfo = [
              {
                objid: '630',
                message: '这是630的删除失败信息',
              },
              {
                objid: '628',
                message: '这是628的删除失败信息',
              },
              {
                objid: '629',
                message: '这是629的删除失败信息',
              },
            ];
            const agInstance = agTable(this.$refs.agGridTableContainer2, {
              datas: data.datas,
              cssStatus: [
                {
                  "css": [
                    "blue-font-row"
                  ],
                  "value": [
                    "已提交"
                  ],
                  "desc": "提交"
                },
                {
                  "css": [
                    "execute-red-font-row",
                    "executed-pink-font-row"
                  ],
                  "value": [
                    "执行中",
                    "已执行"
                  ],
                  "desc": "执行"
                },
                {
                  "css": [
                    "stop-perple-font-row"
                  ],
                  "value": [
                    "已终止"
                  ],
                  "desc": "终止"
                },
                {
                  "css": [
                    "inactive-row"
                  ],
                  "value": [
                    "已作废"
                  ],
                  "desc": "作废"
                }
              ],
              toolPanelSuppressSideButtons: true,
              useDefaultHeader: false,
              cellSingleClick: (colDef, row, target) => {},
              cellDoubleClick: (colDef, row, target) => {},
              rowSingleClick: (colDef, row, target) => {},
              rowDoubleClick: (colDef, row, target) => {},
              onSortChanged: (arrayOfSortInfo) => {
                console.log('on sort changed', arrayOfSortInfo);
                self.fetchFCData();
              },
              onColumnVisibleChanged: (colName, visible) => {
                // 形如 ： ORDERDATE true
                console.log(colName, visible);
              },
              onSelectionChanged: (rowArray) => {
                // rowArray: ['rowID one', 'rowID tow', 'rowID three']
                console.log(rowArray);
              },
              onColumnMoved: (columnState) => {
                // columnState : "DOCNO,ORDERDATE,CP_C_STORE_ID,ID"
                console.log('columnState = ', columnState);
              },
              clearColumnPosition: () => {
                console.log('clearColumnPosition');
              }
            });
            agInstance.setCols(tabth);
            agInstance.setRows(row);
          });
        });
      },
      
      fetchFCDataForWrapper() {
        const self = this;
        fetch('./assets/fc.data.json').then(res => {
          res.json().then(data => {
            const { tabth, row } = data.datas;
            self.cols = tabth;
            self.rows = row;
          });
        });
      },
      
      fetchFCDataOrigin() {
        fetch('/p/cs/QueryList', {
          method: 'POST',
          body: JSON.stringify({
            column_include_uicontroller: true,
            fixedcolumns: {},
            multiple: [],
            startindex: 0,
            table: 'PS_C_PRO'
          })
        }).then(res => {
          console.log(res);
        })
      },
      
      convertCsvToExcel() {
        fetch(`./assets/exportCsv.csv`).then((res) => {
          res.text().then(data => {
            Papa.parse(data, {
              complete(result) {
                console.log('result = ', result.data);
                // result.data.forEach((d, i) => {
                //   console.log(i, d.length);
                // });
              }
            })
          });
        })
      }
    },
    mounted() {
      console.log('Vue组件渲染用时：', Date.now() - beforeMountTime);
      if (this.enableAgTable) {
        this.fetchFCData();
      }
      if (this.enableAgReport) {
        this.fetchCsv();
      }
      // this.convertCsvToExcel();
      // this.mockDemo();
      // this.fetchFCDataOrigin();
      // this.fetchFCDataForWrapper();
    },
  }
</script>

