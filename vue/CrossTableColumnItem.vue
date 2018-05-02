<template>
  <div class="column-item" @click="clickCallBack(info)">
    <p><i class="icon iconfont">&#xe647;</i> {{ info ? info.name || '' : '' }}</p>
  </div>
</template>

<script>

  export default {
    name: 'CrossTableColumnItem',
    props: {
      info: {
        type: Object
      },
      clickCallBack: {
        type: Function
      }
    }
  }
</script>

<style scoped>
  .column-item {
    height: 24px;
    padding: 6px 0;
  }
  
  .column-item:hover {
    cursor: pointer;
  }
  
  p {
    padding: 0;
    margin: 0;
    line-height: 24px;
    font-size: 12px;
  }
</style>
