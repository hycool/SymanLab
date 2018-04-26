<!-- 用于测试大规模数据量的情况下，ag-grid-vue 的性能问题 -->
<template>
  <div>
    <div :style="{width: (childWidth * 3) + (childMarginLeft * 4) + 'px', height: contentHeight + 'px', border: '1px solid #DCDCDC', margin: '15px auto', paddingTop: contentPaddingTop + 'px'}">
      <!-- left  for column defs-->
      <cross-table-column-defs
        :width="childWidth"
        :margin-left="childMarginLeft"
        :column-lists="columnLists"
      >
      </cross-table-column-defs>
      <!-- right for opr area -->
      <div>
        <cross-table-opr-area
          :width="childWidth"
          :margin-left="childMarginLeft"
        >
        </cross-table-opr-area>
        <cross-table-opr-area
          :width="childWidth"
          :margin-left="childMarginLeft"
        >
        </cross-table-opr-area>
        <cross-table-opr-area
          :width="childWidth"
          :margin-top="newLineMarginTop"
          :margin-left="childMarginLeft"
        >
        </cross-table-opr-area>
        <cross-table-opr-area
          :width="childWidth"
          :margin-top="newLineMarginTop"
          :margin-left="childMarginLeft"
        >
        </cross-table-opr-area>
      </div>
    </div>
  </div>
</template>

<script>
  
  import CrossTableColumnDefs from './CrossTableColumnDefs.vue';
  import CrossTableOprArea from './CrossTableOprArea.vue';
  
  const newLineMarginTop = 8;
  const childWidth = 240;
  const childBaseHeight = 226;
  const childMarginLeft = 10;
  const contentPaddingTop = 15;
  const contentHeight = (childBaseHeight * 2) + (contentPaddingTop * 2) + newLineMarginTop ;
  
  export default {
    name: 'CrossTableContainer',
    data() {
      return {
        contentHeight,
        contentPaddingTop,
        childWidth,
        childMarginLeft,
        newLineMarginTop,
        columnLists: [
          { name: '字段1' },
          { name: '字段2' },
          { name: '字段3' },
          { name: '字段4' }
        ]
      }
    },
    components: {
      CrossTableColumnDefs,
      'cross-table-column-defs': CrossTableColumnDefs,
      'cross-table-opr-area': CrossTableOprArea
    }
  }
</script>

<style scoped>
div {
  box-sizing: border-box;
  user-select: none;
  font-family: "Microsoft YaHei UI";
}
</style>
