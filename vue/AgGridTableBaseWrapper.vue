<template>
  <div ref="agTableContainer" style="width: 100%;height: 100%;"></div>
</template>

<script>
  import agTable from './utility/ag-grid-table-pure';
  
  export default {
    name: 'AgGridTableBaseWrapper',
    props: {
      cols: {
        type: Array,
        required: true,
      },
      rows: {
        type: Array,
        required: true,
      }
    },
    mounted() {
      console.log('base wrapper mounted');
      console.log(this.cols);
      console.log(this.rows);
      agTable(this.$refs.agTableContainer)
        .setCols(this.cols)
        .setRows(this.rows);
    },
    updated() {
      console.log('base wrapper updated');
      console.log(this.cols);
      console.log(this.rows);
      agTable(this.$refs.agTableContainer)
        .setCols(this.cols)
        .setRows(this.rows);
    }
  }
</script>

