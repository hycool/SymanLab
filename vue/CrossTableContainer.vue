<template>
  <div>
    <div
      :style="{width: (childWidth * 3) + (childMarginLeft * 4) + 'px', height: contentHeight + 'px', border: '1px solid #DCDCDC', margin: '15px auto', paddingTop: contentPaddingTop + 'px'}">
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
          @move-column="moveColumn"
          @drop-column="dropColumn"
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
          @move-column="moveColumn"
          @drop-column="dropColumn"
          desc="透视字段"
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
          @move-column="moveColumn"
          @drop-column="dropColumn"
          desc="分组字段"
          mark="rowArray"
        >
        </cross-table-opr-area>
        <cross-table-opr-area
          :width="childWidth"
          :margin-top="newLineMarginTop"
          :margin-left="childMarginLeft"
          desc="聚合字段"
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
  const contentHeight = (childBaseHeight * 2) + (contentPaddingTop * 2) + newLineMarginTop;

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
          if (d.colname === info.colname) {
            d.selected = !d.selected;
            return true;
          }
        });
        this.columnLists = [].concat(this.columnLists); // 强制更新this.columnLists
      },
      clickPickedColumn(info) {
        this.columnLists.forEach(d => {
          if (d.colname === info.colname && d.pickedBy === info.pickedBy) {
            d.selected = !d.selected;
          } else if (d.colname !== info.colname && d.pickedBy === info.pickedBy) {
            d.selected = false;
          }
        });
        this.columnLists = [].concat(this.columnLists); // 强制更新this.columnLists
      },
      pickColumn(mark) {
        // 挑选字段
        const arr = [];
        this.columnLists.forEach(d => {
          if (d.selected && !d.pickedBy) {
            // 将未被挑选进组并且当前处于选中状态的栏目进行“入组”处理
            d.pickedBy = mark;
            d.selected = false;
            arr.push(d);
          }
        });
        this.columnLists = [].concat(this.columnLists);
      },
      dropColumn(info, mark) {
        this.columnLists.forEach(d => {
          if (d.colname === info.colname && !d.pickedBy) {
            d.pickedBy = mark;
          }
        });
        this.columnLists = [].concat(this.columnLists);
      },
      removeColumn(info) {
        this.columnLists.some(d => {
          if (d.colname === info.colname) {
            d.pickedBy = undefined;
            d.selected = false;
            d.__page_sequence__ = undefined;
            d.__column_sequence__ = undefined;
            d.__row_sequence__ = undefined;
            return true;
          }
        });
        this.columnLists = [].concat(this.columnLists);
      },
      moveColumn(info, direction) {
        const pickedBy = info.pickedBy;
        const sequenceKeyMap = {
          pageArray: '__page_sequence__',
          columnArray: '__column_sequence__',
          rowArray: '__row_sequence__',
        };
        const sequenceKey = sequenceKeyMap[pickedBy];
        const sequence = info[sequenceKey]; // 当前排序栏目组下的，相对应的排序sequence
        let currentItem;
        let netherItem;
        let upperItem;
        if (direction === 'up' && sequence !== 0) {
          // 向上移动
          // step one : 找到当前移动item 在 其相对应的this[pickedBy]数组中的index
          this[pickedBy].some((d, i) => {
            if (d[sequenceKey] === sequence) {
              d[sequenceKey] -= 1; // 将其排序字段-1
              this[pickedBy][i - 1][sequenceKey] += 1; // 将其上面的item的排序字段+1
              currentItem = d;
              upperItem = this[pickedBy][i - 1];
              return true;
            }
          });
          // step two : 将currentItem && upperItem 更新
          this.columnLists.forEach(d => {
            if (d.colname === currentItem.colname) {
              d[sequenceKey] = currentItem[sequenceKey];
            }
            if (d.colanme === upperItem.colname) {
              d[sequenceKey] = upperItem[sequenceKey];
            }
          });
          this.columnLists = [].concat(this.columnLists);
        }
        else if (direction === 'down' && sequence !== this[pickedBy].length - 1) {
          // step one : 找到当前移动item 在 其相对应的this[pickedBy]数组中的index
          this[pickedBy].some((d, i) => {
            if (d[sequenceKey] === sequence) {
              d[sequenceKey] += 1; // 将其排序字段+1
              this[pickedBy][i + 1][sequenceKey] -= 1; // 将其上面的item的排序字段-1
              currentItem = d;
              netherItem = this[pickedBy][i + 1];
              return true;
            }
          });
          // step two : 将currentItem && upperItem 更新
          this.columnLists.forEach(d => {
            if (d.colname === currentItem.colname) {
              d[sequenceKey] = currentItem[sequenceKey];
            }
            if (d.colanme === netherItem.colname) {
              d[sequenceKey] = netherItem[sequenceKey];
            }
          });
          this.columnLists = [].concat(this.columnLists);
        }
      }
    },
    computed: {
      unPickedColumns() {
        return this.columnLists.map(d => d);
      },
      pageArray() {
        const arr = [];
        let sequenceNumber = 0;
        this.columnLists.forEach(d => {
          if (d.pickedBy === 'pageArray' && d.__page_sequence__ !== undefined) {
            sequenceNumber += 1;
          }
        }); // 先计算出当前全局columnLists中属于pageArray的并且经过排序的个数，作为新增项目的迭代sequenceNumber
        this.columnLists.forEach(d => {
          if (d.pickedBy === 'pageArray') {
            if (d.__page_sequence__ === undefined) {
              d.__page_sequence__ = sequenceNumber;
              sequenceNumber += 1;
            }
            arr.push(d);
          }
        });
        return arr.sort((a, b) => a.__page_sequence__ - b.__page_sequence__);
      },
      columnArray() {
        const arr = [];
        let sequenceNumber = 0;
        this.columnLists.forEach(d => {
          if (d.pickedBy === 'columnArray' && d.__column_sequence__ !== undefined) {
            sequenceNumber += 1;
          }
        });
        this.columnLists.forEach((d, i) => {
          if (d.pickedBy === 'columnArray') {
            if (d.__column_sequence__ === undefined) {
              d.__column_sequence__ = sequenceNumber;
              sequenceNumber += 1;
            }
            arr.push(d);
          }
        });
        return arr.sort((a, b) => a.__column_sequence__ - b.__column_sequence__);
      },
      rowArray() {
        const arr = [];
        let sequenceNumber = 0;
        this.columnLists.forEach(d => {
          if (d.pickedBy === 'rowArray' && d.__row_sequence__ !== undefined) {
            sequenceNumber += 1;
          }
        }); // 先计算出当前全局columnLists中属于pageArray的并且经过排序的个数，作为新增项目的迭代sequenceNumber
        this.columnLists.forEach(d => {
          if (d.pickedBy === 'rowArray') {
            if (d.__row_sequence__ === undefined) {
              d.__row_sequence__ = sequenceNumber;
              sequenceNumber += 1;
            }
            arr.push(d);
          }
        });
        return arr.sort((a, b) => a.__row_sequence__ - b.__row_sequence__);
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
    },
    updated() {
      console.log('----------------------------------');
      console.log(this.pageArray.map(d => d.colname));
      console.log(this.columnArray.map(d => d.colname));
      console.log(this.rowArray.map(d => d.colname));
      console.log('\r\n');
    }
  }
</script>

<style scoped>
  div::-webkit-scrollbar {
    width: 5px;
  }
  
  div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  
  div::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  
  div {
    color: #505050;
    box-sizing: border-box;
    user-select: none;
    font-family: "Microsoft YaHei UI";
  }
</style>
