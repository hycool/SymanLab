<template>
  <div class="fool-table-container">
    <table ref="shadowTable" class="shadowTable"></table>
    <table>
      <thead ref="thead">
        <tr ><th v-for="column in cols" >{{ column.name }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="row in rows">
          <td v-for="columnValue in row">{{ columnValue }}</td>
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
      }
    },
    mounted() {
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
    p {
      text-align: center;
    }
  }
  .fool-table-container::-webkit-scrollbar { width: 8px; height: 8px; };
  .fool-table-container::-webkit-scrollbar-thumb { background-color: #c5c2c2; border-radius: 5px; };
  .fool-table-container::-webkit-scrollbar-track { box-shadow: inset 0 0 15px lightgray; background-color: #f8f7f7; border-radius: 5px; };
</style>
