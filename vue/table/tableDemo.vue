<!-- 本组件内的ag-Grid采用pure javascript 实现 -->
<template>
  <div class="double-table-container">
    <!-- 左边表格 -->
    <!--<div class="table-left" >-->
      <!--<fool-table></fool-table>-->
    <!--</div>-->
    <!-- 右边表格 -->
    <div class="table-right">
      <fool-table
        :cols="cols"
        :rows="rows"
        :colSpanAndRowSpanRules="colSpanAndRowSpanRules"
        :rowAggregateColumns="['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']"
      >
      </fool-table>
    </div>
  </div>
</template>

<script>
  import Mock from 'mockjs';
  import FoolTable from './foolTable.vue';
  
  export default {
    data() {
      return {
        rightTableRowSpanIndex: [],
        rightTableRowSpanAmount: []
      }
    },
    computed: {
      cols() { return this.mockCols(); },
      rows() { return this.mockRows(); },
      colSpanAndRowSpanRules() {
        const { rightTableRowSpanIndex, rightTableRowSpanAmount } = this;
        
        return (rowIndex, columnName) => {
          const info = {
            display: true,
            rowSpan: 0,
          };
          
          // 关于颜色列的col span
          if (columnName === 'PS_C_CLR_ENAME' && rightTableRowSpanIndex.indexOf(rowIndex) === -1 ) {
            info.display = false;
          } else if(columnName === 'PS_C_CLR_ENAME' && rightTableRowSpanIndex.indexOf(rowIndex) !== -1) {
            info.display = true;
            info.rowSpan = rightTableRowSpanAmount[rightTableRowSpanIndex.indexOf(rowIndex)]
          }
          
          // 其他列的row span
          const otherRowSpanColumns = ['DL_B_PUR_REQ_BILL_NO', 'DL_B_PUR_REQ_BILL_TYPE', 'DL_B_PUR_REQ_BILL_DATE', 'CP_C_STORE_ENAME', 'SKU_REQ_REMARK'];
          if (otherRowSpanColumns.indexOf(columnName) !== -1 && rowIndex % 2 === 0) {
            // 以下列的 ：['需求单号', '需求类型', '单据日期', '仓库', '备注']  奇数行
            info.display = true;
            info.rowSpan = 2;
          } else if (otherRowSpanColumns.indexOf(columnName) !== -1 && rowIndex % 2 === 1) {
            // 以下列的 ：['需求单号', '需求类型', '单据日期', '仓库', '备注']  偶数行
            info.display = false;
          }
          
          return info;
        }
      },
      
    },
    components: {
      FoolTable,
      'fool-table': FoolTable
    },
    methods: {
      mockCols() {
        return [
          { colname: 'PS_C_CLR_ENAME', name: '颜色' },
          { colname: 'DL_B_PUR_REQ_BILL_NO', name: '需求单号' },
          { colname: 'DL_B_PUR_REQ_BILL_TYPE', name: '需求类型' },
          { colname: 'DL_B_PUR_REQ_BILL_DATE', name: '单据日期' },
          { colname: 'CP_C_STORE_ENAME', name: '仓库' },
          { colname: 'SKU_REQ_REMARK', name: '备注', displayType: 'textarea' },
          { colname: 'CUSTOMIZE_FIELD_SIZE', name: '尺寸' },
        ].concat(['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map(d => ({ colname: d, name: d, displayType: (rowIndex) => rowIndex % 2 === 0 ? 'input' : 'text' })))
      },
      mockRows() {
        const rows = [];
        for(let i = 0; i < 1000; i++) {
          const colorRandom = Math.round(Math.random() * 100) % 10;
          const QTY_BILL =  Math.round(Math.random() * 100);
          rows.push({
            PS_C_CLR_ENAME : ['红色', '橙色', '黄色', '绿色', '青色', '蓝色', '紫色', '白色', '黑色', '褐色'][colorRandom],
            PS_C_CLR_ECODE: ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9', 'color10'][colorRandom],
            DL_B_PUR_REQ_BILL_NO : `QDFSD-${Math.round(Math.random() * 1000) % 10}`,
            DL_B_PUR_REQ_BILL_TYPE: ['类型一', '类型二', '类型三', '类型四', '类型五'][Math.round(Math.random() * 100) % 5],
            DL_B_PUR_REQ_BILL_DATE: Mock.Random.date('yyyy-MM-dd'),
            CP_C_STORE_ENAME: ['华南仓库', '华北仓库', '华东仓库', '中原仓库', '西北仓库'][Math.round(Math.random() * 100) % 5],
            SKU_REQ_REMARK : Mock.Random.string(5, 10), // 备注
            QTY_BILL, // 需求数量
            QTY_EXEC  : QTY_BILL - Math.round(Math.random() * 10), // 采购数量
            PS_C_SIZE_ENAME: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'][Math.round(Math.random() * 100) % 8], // 尺寸名称
          });
        }
        return this.dealWithOriginData(rows);
      },
      dealWithOriginData(data) {
        // 处理差值
        // const sortArray = this.sortArrayByName(data);
        const tmpArray = [];
        const colorArray = []; // 存放所有颜色的枚举值
        const colorRowCountArray = []; // 记录每种颜色所包含的记录行数
        const colorRowSpanIndex = []; // 记录颜色列所所有row span的行索引
        const uniqueRowKeyMap = {}; // 用于存储根据DL_B_PUR_REQ_BILL_NO需求单号去重后的记录
        const sizeNameEnumerate = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
        data.forEach(d => {
          const key = `${d.PS_C_CLR_ENAME}_${d.DL_B_PUR_REQ_BILL_NO}`;
          if (!uniqueRowKeyMap[key]) {
            uniqueRowKeyMap[key] = {};
            sizeNameEnumerate.forEach(sizeName => {
              uniqueRowKeyMap[key][sizeName] = 0;
            });
          }
          uniqueRowKeyMap[key].PS_C_CLR_ENAME = d.PS_C_CLR_ENAME; // 颜色名称
          uniqueRowKeyMap[key].DL_B_PUR_REQ_BILL_NO = d.DL_B_PUR_REQ_BILL_NO; // 需求单号
          uniqueRowKeyMap[key].DL_B_PUR_REQ_BILL_TYPE = d.DL_B_PUR_REQ_BILL_TYPE; // 需求类型
          uniqueRowKeyMap[key].DL_B_PUR_REQ_BILL_DATE = d.DL_B_PUR_REQ_BILL_DATE; // 单据日期
          uniqueRowKeyMap[key].CP_C_STORE_ENAME = d.CP_C_STORE_ENAME; // 仓库
          uniqueRowKeyMap[key].SKU_REQ_REMARK = d.SKU_REQ_REMARK; // 备注
          uniqueRowKeyMap[key][d.PS_C_SIZE_ENAME] = {
            QTY_BILL: d.QTY_BILL,
            QTY_EXEC: d.QTY_EXEC
          }; // 记录采购数量
        });

        // Step One ：将每一行数据，根据展示要求，按照['需求数量', '采购数量']，拆分为两行
        Object.keys(uniqueRowKeyMap).map(key => uniqueRowKeyMap[key]).sort((a, b) => a['PS_C_CLR_ENAME'].localeCompare(b['PS_C_CLR_ENAME'], 'zh-Hans-CN', { sensitivity: 'accent' })).forEach(d => {
          // 处理奇数行
          const odd = JSON.parse(JSON.stringify(d));
          sizeNameEnumerate.forEach(sizeName => {
            if (typeof odd[sizeName] === 'object') {
              odd[sizeName] = odd[sizeName].QTY_EXEC;
            }
          });
          tmpArray.push(odd);
          
          // 处理偶数行
          const even = JSON.parse(JSON.stringify(d));
          sizeNameEnumerate.forEach(sizeName => {
            if (typeof even[sizeName] === 'object') {
              even[sizeName] = even[sizeName].QTY_BILL;
            }
          });
          tmpArray.push(even);
        });
        tmpArray.forEach((d, i) => {
          (i + 1) % 2 === 0 ? d.CUSTOMIZE_FIELD_SIZE = '需求数量' : d.CUSTOMIZE_FIELD_SIZE = '采购数量';
          // 枚举颜色值
          if(colorArray.indexOf(d.PS_C_CLR_ENAME) === -1) {
            colorArray.push(d.PS_C_CLR_ENAME);
          }
        });
        // Step Two : 处理颜色列的row span
        colorArray.forEach(color => {
          colorRowCountArray.push(tmpArray.filter(d => d.PS_C_CLR_ENAME === color).length);
        });
        
        for(let i = 0; i < colorRowCountArray.length; i++) {
          colorRowSpanIndex.push(colorRowCountArray.slice(0, i).reduce((s, c) =>  s + c, 0));
        }
        
        this.rightTableRowSpanIndex = [].concat(colorRowSpanIndex);
        this.rightTableRowSpanAmount = [].concat(colorRowCountArray);
        
        return tmpArray;
      },
    },
    mounted () {
    
    }
  }
</script>

<style scoped>
  .double-table-container {
    /*border: 1px solid black;*/
    width:  100%;
    height: 500px;
    display: flex;
    /*padding: 15px;*/
  }
  .table-left, .table-right {
    flex: auto;
  }
  .table-left {
    width: 40%;
  }
  .table-right {
    width: 60%;
  }
</style>
