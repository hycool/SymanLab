<!-- 本组件内的ag-Grid采用pure javascript 实现 -->
<template>
  <div class="double-table-container">
    <!-- 左边表格 -->
    <div class="table-left" >
      <!--<fool-table :cols="mockCols" :rows="mockRows"></fool-table>-->
    </div>
    <!-- 右边表格 -->
    <div class="table-right">
      <fool-table :cols="mockCols" :rows="mockRows"></fool-table>
    </div>
  </div>
</template>

<script>
  import Mock from 'mockjs';
  import FoolTable from './foolTable.vue';
  
  export default {
    data() { return {} },
    computed: {
      mockCols() {
        return [
          { colname: 'c1', name: '颜色' },
          { colname: 'c2', name: '需求单号' },
          { colname: 'c3', name: '需求类型' },
          { colname: 'c4', name: '单据日期' },
          { colname: 'c5', name: '仓库' },
          { colname: 'c6', name: '备注' },
          { colname: 'c7', name: '尺寸' },
          { colname: 'c8', name: 'S' },
          { colname: 'c9', name: 'L' },
          { colname: 'c10', name: 'XL' },
          { colname: 'c11', name: 'XXL' }
        ]
      },
      mockRows() {
        const rows = [];
        for(let i = 0; i < 100; i++) {
          rows.push({
            c1: ['红色', '橙色', '黄色', '绿色', '青色', '蓝色', '紫色', '白色', '黑色', '褐色'][Math.round(Math.random() * 100) % 10],
            c2: Math.round(Math.random() * 10000000000),
            c3: ['类型一', '类型二', '类型三', '类型四', '类型五'][Math.round(Math.random() * 100) % 5],
            c4: Mock.Random.date('yyyy-MM-dd'),
            c5: ['华南仓库', '华北仓库', '华东仓库', '中原仓库', '西北仓库'][Math.round(Math.random() * 100) % 5],
            c6: Mock.Random.string(5, 10),
            c7: '需求数量',
            c8: Math.round(Math.random() * 100),
            c9: Math.round(Math.random() * 100),
            c10: Math.round(Math.random() * 100),
            c11: Math.round(Math.random() * 100),
          });
        }
        return rows;
      }
    },
    components: {
      FoolTable,
      'fool-table': FoolTable
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
