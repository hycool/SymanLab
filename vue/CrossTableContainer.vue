<template>
  <div>
    <div :style="{width: (childWidth * 3) + (childMarginLeft * 4) + 'px', height: contentHeight + 'px', border: '1px solid #DCDCDC', margin: '15px auto', paddingTop: contentPaddingTop + 'px'}">
      <!-- left  for column defs-->
      <cross-table-column-defs
        :width="childWidth"
        :margin-left="childMarginLeft"
        :column-lists="unPickedColumns"
        @click-unpicked-column="clickUnpickedColumn"
      >
      </cross-table-column-defs>
      <!-- right for opr area -->
      <div>
        <cross-table-opr-area
          :width="childWidth"
          :margin-left="childMarginLeft"
          :unpicked-columns="unPickedColumns"
          :picked-columns="pageArray"
          @pick-column="pickColumn"
          @remove-column="removeColumn"
          @click-picked-column="clickPickedColumn"
          desc="页定义"
          mark="pageArray"
        >
        </cross-table-opr-area>
        <cross-table-opr-area
          :width="childWidth"
          :margin-left="childMarginLeft"
          :unpicked-columns="unPickedColumns"
          :picked-columns="columnArray"
          @pick-column="pickColumn"
          @remove-column="removeColumn"
          @click-picked-column="clickPickedColumn"
          desc="列定义"
          mark="columnArray"
        >
        </cross-table-opr-area>
        <cross-table-opr-area
          :width="childWidth"
          :margin-top="newLineMarginTop"
          :margin-left="childMarginLeft"
          :unpicked-columns="unPickedColumns"
          :picked-columns="rowArray"
          @pick-column="pickColumn"
          @remove-column="removeColumn"
          @click-picked-column="clickPickedColumn"
          desc="行定义"
          mark="rowArray"
        >
        </cross-table-opr-area>
        <cross-table-opr-area
          :width="childWidth"
          :margin-top="newLineMarginTop"
          :margin-left="childMarginLeft"
          desc="汇总字段"
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
        columnLists: [], // 全部列集合
      }
    },
    methods: {
      clickUnpickedColumn(info) {
        this.columnLists.some(d => {
          if(d.colname === info.colname) {
            d.selected = !d.selected;
            return true;
          }
        });
        this.columnLists = [].concat(this.columnLists); // 强制更新this.columnLists
      },
      clickPickedColumn(info) {
        this.columnLists.forEach(d => {
          if(d.colname === info.colname && d.pickedBy === info.pickedBy) {
            d.selected = !d.selected;
          } else if(d.colname !== info.colname && d.pickedBy === info.pickedBy) {
            d.selected = false;
          }
        });
        this.columnLists = [].concat(this.columnLists); // 强制更新this.columnLists
      },
      pickColumn(mark) {
        // 挑选字段
        const arr = [];
        this.columnLists.forEach(d => {
          if (d.selected) {
            d.pickedBy = mark;
            d.selected = false;
            arr.push(d);
          }
        });
        this.columnLists = [].concat(this.columnLists);
      },
      removeColumn(info) {
        this.columnLists.some(d => {
          if (d.colname === info.colname) {
            d.pickedBy = undefined;
            d.selected = false;
            return true;
          }
        });
        this.columnLists = [].concat(this.columnLists);
      }
    },
    computed: {
      unPickedColumns() {
        return this.columnLists.map(d => d);
      },
      pageArray() {
        const arr = [];
        this.columnLists.forEach(d => {
          if (d.pickedBy === 'pageArray') {
            arr.push(d);
          }
        });
        return arr;
      },
      columnArray() {
        const arr = [];
        this.columnLists.forEach(d => {
          if (d.pickedBy === 'columnArray') {
            arr.push(d);
          }
        });
        return arr;
      },
      rowArray() {
        const arr = [];
        this.columnLists.forEach(d => {
          if (d.pickedBy === 'rowArray') {
            arr.push(d);
          }
        });
        return arr;
      }
    },
    components: {
      CrossTableColumnDefs,
      'cross-table-column-defs': CrossTableColumnDefs,
      'cross-table-opr-area': CrossTableOprArea
    },
    beforeMount() {
      const self = this;
      fetch('./assets/crossTableConfig.json').then(res => {
        res.json().then(data => {
          self.columnLists = data;
        });
      });
    }
  }
</script>

<style scoped>
div {
  color: #505050;
  box-sizing: border-box;
  user-select: none;
  font-family: "Microsoft YaHei UI";
}
</style>
