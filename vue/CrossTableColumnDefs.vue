<template>
  <div class="list-container" :style="{ width: width + 'px', marginLeft: marginLeft + 'px' }">
    <div class="desc" ref="desc">字段列表</div>
    <div class="list" ref="list">
      <cross-table-column-item
        v-for="column in columnLists"
        v-if="!column.pickedBy"
        :info="column"
        :enableDrag="true"
        :key="'key' + Math.round(Math.random() * 1000000)"
        :click-call-back="clickCallBack"
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
      clickCallBack(info) {
        this.$emit('click-unpicked-column', info);
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
    },
    mounted() {
      this.$refs.list.style.height = `${ 460 - this.$refs.desc.offsetHeight - 4 }px`;
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
    overflow: auto;
  }
</style>
