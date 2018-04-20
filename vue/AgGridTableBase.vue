<!-- 本组件是接受props作为参数用来渲染ag-grid的基础vue类 -->
<!-- ag-grid-vue 不支持localeText 汉化 -->
<template>
  <div style="width: 900px;">
    <ag-grid-vue style="width: 100%; height: 350px;" class="ag-theme-balham"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :rowData="rowData"
                 :localeText="localeText"
                 :enableColResize="enableColResize"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
  import { AgGridVue } from "ag-grid-vue";
  import "../node_modules/ag-grid/dist/styles/ag-grid.css"
  import "../node_modules/ag-grid/dist/styles/ag-theme-balham.css"
  import "ag-grid-enterprise/main";
  import localeText from './agGridInternationalization';
  
  export default {
    components: {
      'ag-grid-vue': AgGridVue,
    },
    props: {
      gridOptions: {
        type: Object,
        default: () => ({
          localeText
        }),
      },
      columnDefs: {
        type: Array,
        default: () => [{ headerName: 'column one', field: 'columnOne' }],
      },
      rowData: {
        type: Array,
        default: () => [{ columnOne: 'hello' }],
      },
      localeTextFunc: {
        type: Function,
        default: (key, defaultValue) => {
          console.log(key, defaultValue);
        }
      },
      enableColResize: {
        type: Boolean,
        default: true
      }
    },
  }
</script>

