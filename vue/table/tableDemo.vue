<!-- 本组件内的ag-Grid采用pure javascript 实现 -->
<template>
  <div class="double-table-container">
    <!-- 左边表格 -->
    <!--<div class="table-left" >-->
      <!--<fool-table :cols="mockCols" :rows="mockRows"></fool-table>-->
    <!--</div>-->
    <!-- 右边表格 -->
    <div class="table-right">
      <fool-table :cols="cols" :rows="rows" :colSpanAndRowSpanRules="colSpanAndRowSpanRules"></fool-table>
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
          { colname: 'SKU_REQ_REMARK', name: '备注' },
          { colname: 'CUSTOMIZE_FIELD_SIZE', name: '尺寸' },
        ]
      },
      mockRows() {
        const rows = [];
        for(let i = 0; i < 100; i++) {
          rows.push({
            PS_C_CLR_ENAME : ['红色', '橙色', '黄色', '绿色', '青色', '蓝色', '紫色', '白色', '黑色', '褐色'][Math.round(Math.random() * 100) % 10],
            DL_B_PUR_REQ_BILL_NO : Math.round(Math.random() * 10000000000),
            DL_B_PUR_REQ_BILL_TYPE: ['类型一', '类型二', '类型三', '类型四', '类型五'][Math.round(Math.random() * 100) % 5],
            DL_B_PUR_REQ_BILL_DATE: Mock.Random.date('yyyy-MM-dd'),
            CP_C_STORE_ENAME: ['华南仓库', '华北仓库', '华东仓库', '中原仓库', '西北仓库'][Math.round(Math.random() * 100) % 5],
            SKU_REQ_REMARK : Mock.Random.string(5, 10),
            QTY_BILL : Math.round(Math.random() * 100), // 需求数量
            QTY_EXEC  : Math.round(Math.random() * 100), // 采购数量
            PS_C_SIZE_ENAME: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'][Math.round(Math.random() * 100) % 8], // 尺寸名称
          });
        }
        return this.dealWithOriginData(rows);
      },
      sortArrayByName(data) {
        return data.sort((a, b) => a['PS_C_CLR_ENAME'].localeCompare(b['PS_C_CLR_ENAME'], 'zh-Hans-CN', {sensitivity: 'accent'}));
      },
      dealWithOriginData(data) {
        // 处理差值
        const sortArray = this.sortArrayByName(data);
        const tmpArray = [];
        const colorArray = []; // 存放所有颜色的枚举值
        const colorRowCountArray = []; // 记录每种颜色所包含的记录行数
        const colorRowSpanIndex = []; // 记录颜色列所所有row span的行索引
        

        // Step One ：将每一行数据，根据展示要求，按照['需求数量', '采购数量']，拆分为两行
        sortArray.forEach(d => {
          tmpArray.push(JSON.parse(JSON.stringify(d)));
          tmpArray.push(JSON.parse(JSON.stringify(d)));
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
        
        // console.log('colorArray = ', colorArray);
        // console.log('colorRowCountArray = ', colorRowCountArray);
        // console.log('colorRowSpanIndex = ', colorRowSpanIndex);
        
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
    border: 1px solid black;
    width:  100%;
    height: 500px;
    display: flex;
    padding: 15px;
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
