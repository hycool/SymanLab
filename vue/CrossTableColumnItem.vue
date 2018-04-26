<!-- 用于测试大规模数据量的情况下，ag-grid-vue 的性能问题 -->
<template>
  <div class="column-item">
    <p>{{ info.name }}</p>
  </div>
</template>

<script>
  
  export default {
    name: 'CrossTableColumnItem',
    props: {
      info: {
        type: Object
      }
    }
  }
</script>

<style scoped>
.column-item {
  border: 1px solid #DCDCDC;
  height: 24px;
}
p {
  padding: 0;
  margin: 0;
  line-height: 24px;
  font-size: 14px;
}
</style>
