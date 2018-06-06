<template>
  <div class="fool-table-container">
    <table ref="shadowTable" class="shadowTable"></table>
    <table>
      <thead ref="thead">
        <tr ><th v-for="column in cols" >{{ column.name }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows">
          <td
            v-for="column in cols"
            v-if="colSpanAndRowSpanRules(rowIndex, column.colname, row).display"
            :rowspan="colSpanAndRowSpanRules(rowIndex, column.colname, row).rowSpan || ''"
            :colspan="colSpanAndRowSpanRules(rowIndex, column.colname, row).colSpan || ''"
          >
            {{ row[column.colname] }}
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
      cols: {
        type: Array,
        default: () => []
      },
      rows: {
        type: Array,
        default: () => []
      },
      colSpanAndRowSpanRules: {
        type: Function,
        default: () => {
          return () => ({ display: true, rowSpan: 0, colSpan: 0 })
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
      padding: 5px 15px;
      white-space: nowrap;
      color: #575757;
    }
    td, th {
      border-right: 1px solid lightgray;
    }
    p {
      text-align: center;
    }
  }
  .fool-table-container::-webkit-scrollbar { width: 8px; height: 8px; };
  .fool-table-container::-webkit-scrollbar-thumb { background-color: #c5c2c2; border-radius: 5px; };
  .fool-table-container::-webkit-scrollbar-track { box-shadow: inset 0 0 15px lightgray; background-color: #f8f7f7; border-radius: 5px; };
</style>
