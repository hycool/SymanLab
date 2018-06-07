<template>
  <div class="fool-table-container">
    <table ref="shadowTable" class="shadowTable"></table>
    <table>
      <thead ref="thead">
        <tr >
          <th v-for="column in cols" >{{ column.name }}</th>
          <!-- 处理行级合计列 -->
          <th v-if="rowAggregateColumns.length > 0">合计</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows">
          <td
            v-for="column in cols"
            v-if="colSpanAndRowSpanRules(rowIndex, column.colname, row).display"
            :rowspan="colSpanAndRowSpanRules(rowIndex, column.colname, row).rowSpan || ''"
            :colspan="colSpanAndRowSpanRules(rowIndex, column.colname, row).colSpan || ''"
          >
            {{ column.displayType === undefined || getDisplayType(column.displayType, rowIndex, column.colname, row) === 'text' ? row[column.colname] : '' }}
            <input
              v-if="getDisplayType(column.displayType, rowIndex, column.colname, row) === 'input'"
              :value="row[column.colname]"
              :data-init-value="encodeURI(row[column.colname])"
              type="number"
              min="0"
            />
            <textarea
              v-if="getDisplayType(column.displayType, rowIndex, column.colname, row) === 'textarea'"
              :value="row[column.colname]"
              :data-init-value="encodeURI(row[column.colname])"
              spellcheck="false"
              rows="3"
            >
            </textarea>
          </td>
          <!-- 处理行级合计列 -->
          <td v-if="rowAggregateColumns.length > 0">
            {{ rowAggregateColumns.reduce((acc, value) => acc + (parseFloat(row[value]) || 0), 0) }}
          </td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'foolTable',
    props: {
      cols: { // 列信息
        type: Array,
        default: () => []
      },
      rows: { // 行信息
        type: Array,
        default: () => []
      },
      colSpanAndRowSpanRules: { // 合并单元格规则函数
        type: Function,
        default: () => {
          return () => ({ display: true, rowSpan: 0, colSpan: 0 })
        }
      },
      rowAggregateColumns: { // 需要进行行级合计的列
        type: Array,
        default: () => [],
      },
      columnAggregateColumns: { // 需要进行列级合计的列
        type: Array,
        default: () => [],
      }
    },
    methods: {
      getDisplayType(displayType, rowIndex, columnName, rowData) {
        if (typeof displayType === 'string') { return displayType }
        if (typeof displayType === 'function') {
          return displayType(rowIndex, columnName, rowData);
        }
      }
    },
    mounted() {
      // console.log('typeof this.colSpanAndRowSpanRules', typeof this.colSpanAndRowSpanRules);
      // console.log(this.colSpanAndRowSpanRules());
    },
  }
</script>

<style scoped lang="less">
  .fool-table-container {
    width: 100%;
    height: 100%;
    border: 1px solid lightgray;
    overflow: auto;
    position: relative;
    .shadowTable {
      /*position: absolute;*/
      /*top: 0;*/
      /*left: 0;*/
    }
    table, thead, tbody, tfoot, th, tr, td {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
      border: 0;
      font-size: 13px;
      user-select: none;
    }
    thead {
      border-bottom: 1px solid lightgray;
    }
    tr:not(:first-child):not(:last-child) {
      border: 1px solid lightgray;
      border-left: none;
      border-right: none;
    }
    th {
      font-weight: 400;
      padding: 5px 15px;
      white-space: nowrap;
    }
    td {
      padding: 5px;
      white-space: nowrap;
      color: #575757;
    }
    td, th {
      border-right: 1px solid lightgray;
      text-align: center;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    input[type="number"]{
      -moz-appearance: textfield;
    }
    td input {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 2px;
      text-align: center;
      width: 80px;
      color: #575757;
    }
    td textarea {
      font-family: "Microsoft YaHei UI", "Microsoft YaHei";
      font-size: 13px;
      padding: 5px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      resize: none;
      color: #575757;
    }
    p {
      text-align: center;
    }
  }
  .fool-table-container::-webkit-scrollbar { width: 8px; height: 8px; };
  .fool-table-container::-webkit-scrollbar-thumb { background-color: #c5c2c2; border-radius: 5px; };
  .fool-table-container::-webkit-scrollbar-track { box-shadow: inset 0 0 15px lightgray; background-color: #f8f7f7; border-radius: 5px; };
</style>
