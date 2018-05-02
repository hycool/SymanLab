<template>
  <div class="list-container" :style="{ width: width + 'px', marginLeft: marginLeft + 'px' }">
    <div class="desc">字段列表</div>
    <div class="list">
      <cross-table-column-item
        v-for="column in columnLists"
        :info="column"
        :key="'key' + Math.round(Math.random() * 1000000)"
        :click-call-back="pickCols"
      ></cross-table-column-item>
    </div>
  </div>
</template>

<script>

  import CrossTableColumnItem from './CrossTableColumnItem.vue';

  export default {
    name: 'CrossTableColumnDefs',
    components: {
      'cross-table-column-item': CrossTableColumnItem
    },
    methods: {
      pickCols(col) {
        console.log(col);
      }
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
    border-radius: 4px;
    height: 460px;
    float: left;
  }
  
  .desc {
    font-size: 13px;
    padding: 6px 17px 6px 17px;
  }
  
  .list {
    border-top: 1px solid #DEDEDE;
    margin: 0 15px 0 10px;
  }
</style>
