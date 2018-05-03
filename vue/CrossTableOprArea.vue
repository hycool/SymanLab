<!-- 用于测试大规模数据量的情况下，ag-grid-vue 的性能问题 -->
<template>
  <div
    class="opr-area"
    :style="{marginTop: marginTop + 'px', marginLeft: marginLeft + 'px', width: width + 'px'}"
    ref="oprArea"
  >
    <div class="desc" ref="desc">
      {{ desc || '' }}
      <span class="icon-btn">
        <i class="icon iconfont hover" :class="{ colored: pickable }" @click="pickColumns">&#xe64a;</i>
        <i class="icon iconfont hover">&#xe712;</i>
        <i class="icon iconfont hover">&#xe711;</i>
      </span>
    </div>
    <div class="list" ref="list">
      <cross-table-column-item
        v-for="column in pickedColumns"
        :info="column"
        :key="'key' + Math.round(Math.random() * 1000000)"
        :click-call-back="clickCallBack"
        @remove-column="removeColumn"
      ></cross-table-column-item>
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
      },
      unpickedColumns: {
        type: Array
      },
      mark: {
        type: String
      },
      pickedColumns: {
        type: Array
      }
    },
    computed: {
      pickable() {
        return this.unpickedColumns ? this.unpickedColumns.some(d => d.selected) : false;
      }
    },
    methods: {
      pickColumns() {
        if (this.pickable) {
          this.$emit('pick-column', this.mark);
        }
      },
      removeColumn(info) {
        this.$emit('remove-column', info);
      },
      clickCallBack(info) {
        this.$emit('click-picked-column', info);
      }
    },
    components: {
      CrossTableColumnItem
    },
    mounted() {
      const { list, desc, oprArea } = this.$refs;
      list.style.height = `${oprArea.offsetHeight - desc.offsetHeight - 4}px`;
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
    overflow: auto;
  }
  .hover:hover {
    cursor: pointer;
    opacity: 0.5;
  }
  
  .colored {
    color: #0F8EE9;
  }
  
</style>
