<!-- 用于测试大规模数据量的情况下，ag-grid-vue 的性能问题 -->
<template>
  <div class="list-container" :style="{ width: width + 'px', marginLeft: marginLeft + 'px' }">
    <div>字段列表</div>
    <cross-table-column-item v-for="column in columnLists" :info="column"></cross-table-column-item>
  </div>
</template>

<script>
  
  import CrossTableColumnItem from './CrossTableColumnItem.vue';
  
  export default {
    name: 'CrossTableColumnDefs',
    components: {
      'cross-table-column-item': CrossTableColumnItem
    },
    props: {
      width: {
        type: Number
      },
      marginLeft: {
        type: Number
      },
      columnLists: {
        type: Array,
      }
    }
  }
</script>

<style scoped>
.list-container {
  border: 1px solid #DCDCDC;
  height: 460px;
  float: left;
}
</style>
