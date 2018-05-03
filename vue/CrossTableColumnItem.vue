<template>
  <div
    class="column-item"
    @click="typeof clickCallBack === 'function' ? clickCallBack(info) : null"
    :class="{ 'bg-selected' : info.selected, 'bg-picked': info.pickedBy }"
  >
    <p>
      <i class="icon iconfont icon-color" v-if="!info.selected && !info.pickedBy">&#xe647;</i>
      <i class="icon iconfont icon-color selected" v-if="info.selected && !info.pickedBy">&#xe646;</i>
      {{ info ? info.name || '' : '' }}
      <i class="icon iconfont remove" v-if="info.pickedBy" @click="removeColumn(info)">&#xe638;</i>
    </p>
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
    },
    methods: {
      removeColumn(info) {
        this.$emit('remove-column', info);
      }
    }
  }
</script>

<style scoped>
  .column-item {
    height: 24px;
    padding: 6px 0;
    margin: 6px;
  }
  
  .column-item.bg-picked {
    background-color: #F5F6FA;
  }

  .column-item.bg-selected {
    background-color: #F1F9FE !important;
  }
  
  .column-item:hover {
    background-color: #F1F9FE;
  }
  
  .column-item:hover {
    cursor: pointer;
  }
  
  .column-item p {
    position: relative;
  }
  
  p {
    padding: 0 0 0 6px;
    margin: 0;
    line-height: 24px;
    font-size: 12px;
    color: #575757;
  }
  
  i {
    color: #888888
  }
  
  i.selected {
    color: #0F8EE9;
  }
  
  i.remove {
    position: absolute;
    right: 5px;
  }
  
  i.remove:hover {
    color: #E80000;
  }
</style>
