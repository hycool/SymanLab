<!-- 用于测试大规模数据量的情况下，ag-grid-vue 的性能问题 -->
<template>
  <ag-grid-table-base
    :columnDefs="columnDefs"
    :rowData="rowData"
    :gridOptions="gridOptions"
  ></ag-grid-table-base>
</template>

<script>
  import AgGridTableBase  from './AgGridTableBase.vue';
  import Papa from 'papaparse';

  const headers = [
    '序号', '门店ID', '门店名称', '补货周期', '商品编码', '大类', '商品性质', 'STYLENAME', '上市日期', '上市天数', 'NEWSTYLE', '条码排名', 'SIZEORDER', 'CLR', '颜色', '尺码', '条码', '现零售价', 'SKUFLAG', '前7天销售', '前6天销售', '前5天销售', '前4天销售', '前3天销售', '前2天销售', '前1天销售', '本周销量', '本周销售额', '陈列数量C', '销售目标库存D', '补货目标库存E=MAX(C,D)', '补货计划G=E-F', '在库数量', '在途数量', '店铺库存F', '整款销量', '整款库存', '整款销售金额', '滞销款', 'QTYSAFE1', 'QTYSTOCK1', '停止补货', 'STATE', '退货', 'RETSTATE', '退货数量', '补货', '特殊订单未计入量', '补货天花板A=MIN(A1,A2)', '门店权重系数', 'QTYSTOCKCLR', 'OLDQTYDISPLAY', 'IFMODIFYDISPLAY', 'QTYDISPLAYSTORE', 'QTYPLAN', 'QTYDIFF', '陈列标准', 'REMARK', '推广信息', 'LOWPRICE', 'QTYSTOCKING', 'STYLESALEFLAG', '整款排名', '退仓', '季节', '销售老化款', '款式', '性别', '标准价', '最近铺货日期', 'SPORADICSTYLE', 'MCLASS', '补货推广类型', '过量库存', '天花板上限A2', '其余六天平均B', '周最大日销量A1', 'STYLEATT12', 'PROVINCE', 'SALEAREA', '门店编码', '整款销售状态', 'SKU销售状态', '配销中心', '店铺清理类型', '原陈列数'
  ];
  
  export default {
    name: 'AgGridTable',
    data() {
      return {
        gridOptions: {
          enableSorting: true
        },
        columnDefs: [],
        rowData: []
      }
    },
    components: {
      'ag-grid-table-base': AgGridTableBase,
    },
    methods: {
      transformColumnDefs() {
        const columnDefs = [];
        headers.forEach(function(d, i) {
          columnDefs.push({
            headerName: `${d}-(${i + 1})`,
            field: 'field' + i
          })
        });
        return columnDefs;
      },
      transformRowData(data) {
        console.log('待转换数记录数：', data.length);
        const t = Date.now();
        const rowData = data.map(d => {
          const row = {};
          headers.forEach((hd, hi) => {
            row[`field${hi}`] = d[hi] || '';
          });
          return row;
        });
        console.log('转换 Array 到 JSON 耗时', Date.now() - t, 'ms');
        return rowData;
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
                self.columnDefs = self.transformColumnDefs();
                const rowData = self.transformRowData(result.data);
                self.rowData = rowData;
              }
            })
          });
        })
      }
    },
    beforeMount() {
      this.fetchCsv()
    }
  }
</script>

<style scoped>

</style>
