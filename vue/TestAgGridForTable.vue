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

  export default {
    name: 'AgGridTable',
    components: {
      'ag-grid-table-base': AgGridTableBase,
    },
  }
</script>

<style scoped>

</style>
