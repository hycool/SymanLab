<template>
  <div class="filter-container">
    <div class="filter-content">
      <div v-for="item in filterItems" class="filter-item" :title="item.description || ''">
        <label class="filter-label">{{ item.description || '' }}：</label>
        <div class="filter-input">
          <input type="text" placeholder="" />
        </div>
      </div>
      <div class="tag-close"><i class="el-icon-arrow-up"></i></div>
    </div>
  </div>
</template>

<script>
  const FILTER_TYPE = {
    SINGLE_DATE: 'single-date', // 单日期时间选择框
    RANG_DATE: 'range-date', // 时间范围选择框
    DROPDOWN_SELECT: 'dropdown-select', // 下拉选择框，不走api查询
    DROPDOWN_SELECT_API: 'dropdown-select-api', // 下拉选择列表，需要根据参数独立查询api
  };
  export default {
    name: 'customerReport',
    data() {
      return {
        selects: {}, // 下拉单选、多选枚举类型
        filterItems: [], // 过滤器明细
      };
    },
    methods: {
      fetchFilter() {
        const self = this;
        fetch('./assets/getTableQuery.json').then(res => {
          res.json().then(data => {
            const { selects, params } = data.data;
            self.selects = selects;
            self.filterItems = params;
            params.forEach((d) => {
              console.log(self.peelFilterType(d));
            })
          });
        });
      },
      mockFetchFilter() {
        const self = this;
        setTimeout(() => {
          const data ={
            "code": 0,
            "data": {
              "selects": {
                "1": [
                  {
                    "orderno": 2,
                    "description": "周",
                    "value": "W"
                  },
                  {
                    "orderno": null,
                    "description": "月",
                    "value": "M"
                  },
                  {
                    "orderno": null,
                    "description": "年",
                    "value": "Y"
                  }
                ]
              },
              "params": [
                {
                  "ad_column_id": null,
                  "orderno": 5,
                  "nullable": "N",
                  "selectiontype": null,
                  "rp_limitvalue_group_id": null,
                  "name": "DATE",
                  "description": "日期",
                  "defaultvalue": null,
                  "paratype": "D"
                },
                {
                  "ad_column_id": null,
                  "orderno": 10,
                  "nullable": "N",
                  "selectiontype": null,
                  "rp_limitvalue_group_id": 1,
                  "name": "DATETYPE",
                  "description": "日期类型",
                  "defaultvalue": "W",
                  "paratype": "S"
                },
                {
                  "ad_column_id": 135367,
                  "orderno": 20,
                  "nullable": "Y",
                  "selectiontype": "drp",
                  "rp_limitvalue_group_id": null,
                  "name": "CP_C_DISTRIB_ID",
                  "description": "分区",
                  "defaultvalue": null,
                  "paratype": "N"
                },
                {
                  "ad_column_id": 147139,
                  "orderno": 30,
                  "nullable": "Y",
                  "selectiontype": null,
                  "rp_limitvalue_group_id": null,
                  "name": "NUMDIM26",
                  "description": "品类",
                  "defaultvalue": null,
                  "paratype": "N"
                },
                {
                  "ad_column_id": 132812,
                  "orderno": 40,
                  "nullable": "Y",
                  "selectiontype": "mrp",
                  "rp_limitvalue_group_id": null,
                  "name": "PROSEA",
                  "description": "商品季节",
                  "defaultvalue": null,
                  "paratype": "N"
                }
              ]
            }
          };
          const { selects, params } = data.data;
          self.selects = selects;
          self.filterItems = params;
          params.forEach((d) => {
            self.peelFilterType(d);
          })
        }, 0);
      },
      peelFilterType(filterInfo) {
        const { paratype, rp_limitvalue_group_id, ad_column_id } = filterInfo;
        if (paratype.toLocaleLowerCase() === 'd') {
          // 单日期时间选择框
          return FILTER_TYPE.SINGLE_DATE;
        }
        if (paratype.toLocaleLowerCase() === 'r') {
          // 时间范围选择框
          return FILTER_TYPE.RANG_DATE;
        }
        if (rp_limitvalue_group_id !== null && ad_column_id === null) {
          // 下拉选择，不走api
          return FILTER_TYPE.DROPDOWN_SELECT;
        }
        if (ad_column_id !== null) {
          // 下拉选择列表，需要根据参数独立查询api
          return FILTER_TYPE.DROPDOWN_SELECT_API;
        }
      }
    },
    mounted() {
      this.fetchFilter();
      // this.mockFetchFilter();
    }
  }
</script>

<style scoped>
  div, input {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .filter-container {
    margin-top: 5px;
    font-size: 12px;
    position: relative;
    min-height: 20px;
    width: 100%;
    border: 1px solid #d8d8d8;
  }
  .filter-content {
    padding-right: 28px;
  }
  .filter-item {
    display: inline-block;
    width: 25%;
    margin-right: 0;
    margin-bottom: 0;
    margin-top: 8px;
    position: relative;
    color: #575757;
    /*border: 1px solid blue;*/
  }
  .filter-label {
    display: inline-block;
    text-align: right;
    font-size: 12px;
    width: 90px;
    height: 24px;
    line-height: 24px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .filter-input {
    display: inline-block;
    height: 24px;
    line-height: 0;
    width: calc(100% - 94px);
    vertical-align: top;
  }
  .filter-input input {
    width: 100%;
    font-size: 12px;
    text-align: left;
    border: 1px solid #b4b4b4;
    border-radius: 2px;
    padding: 0 4px;
    height: 24px;
    position: relative;
  }
  .tag-close {
    /*border: 1px solid black;*/
    width: 28px;
    height: 16px;
    position: absolute;
    top: 0;
    right: 0;
    margin-left: -20px;
    background-color: #fe6846;
    text-align: center;
    line-height: 16px;
    cursor: pointer;
    color: #fff;
    border-radius: 0 0 2px 2px;
  }
</style>
