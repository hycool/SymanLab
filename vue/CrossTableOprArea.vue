<!-- 用于测试大规模数据量的情况下，ag-grid-vue 的性能问题 -->
<template>
  <div class="opr-area" :style="{marginTop: marginTop + 'px', marginLeft: marginLeft + 'px', width: width + 'px'}">
    <div class="desc">
      {{ desc || '' }}
      <span class="icon-btn">
        <i class="icon iconfont hover">&#xe644;</i>
        <i class="icon iconfont hover">&#xe60c;</i>
        <i class="icon iconfont hover">&#xe65c;</i>
      </span>
    </div>
    <div class="list">
    </div>
  </div>
</template>

<script>
  import CrossTableColumnItem from './CrossTableColumnItem.vue';

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
      },
      desc: {
        type: String
      }
    },
    components: {
      CrossTableColumnItem
    }
  }
</script>

<style scoped>
  .opr-area {
    border: 1px solid #DCDCDC;
    border-radius: 4px;
    height: 226px;
    float: left;
  }
  
  .desc {
    font-size: 13px;
    padding: 6px 17px 6px 17px;
    position: relative;
  }

  .icon-btn {
    position: absolute;
    right: 15px;
  }
  
  .list {
    border-top: 1px solid #DEDEDE;
    margin: 0 15px 0 10px;
  }
  .hover:hover {
    cursor: pointer;
    opacity: 0.5;
  }
</style>
