<!-- 用于测试大规模数据量的情况下，ag-grid-vue 的性能问题 -->
<template>
  <div class="opr-area" :style="{marginTop: marginTop + 'px', marginLeft: marginLeft + 'px', width: width + 'px'}">
    <h1>opr-area</h1>
  </div>
</template>

<script>
  
  export default {
    name: 'CrossTableOprArea',
    props: {
      marginTop: {
        type: Number,
      },
      marginLeft: {
        type: Number
      },
      width: {
        type: Number
      }
    },
  }
</script>

<style scoped>
.opr-area {
  border: 1px solid #DCDCDC;
  height: 226px;
  float: left;
}
</style>
