const data =
  {
    'code': 0,
    'datas': {
      'subtotalRow': {
        'AMT_ACTUAL': '333.00',
        'PRICE_ACTUAL': '333.00',
        'DPRICE_LIST': '0.00',
        'QTY_EXEC': 4
      },
      'start': 0,
      'fullRangeSubTotalRow': {
        'AMT_ACTUAL': { 'val': '333.00' },
        'PRICE_ACTUAL': { 'val': '333.00' },
        'DPRICE_LIST': { 'val': '0.00' },
        'QTY_EXEC': { 'val': '4.00' }
      },
      'ordids': [{ 'colname': 'ID', 'ordasc': true }],
      'isFullRangeSubTotalEnabled': true,
      'message': null,
      'tabname': 'DL_B_PUR_REQ_EXEC_ITEM',
      'isSubTotalEnabled': true,
      'tabth': [{
        'issubtotal': false,
        'orderno': 1,
        'isak': true,
        'display': 'text',
        'scale': 0,
        'type': 'NUMBER',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'ID',
        'isuppercase': false,
        'isnotnull': false,
        'ismodify': false,
        'name': 'ID',
        'inputname': 'ID'
      }, {
        'issubtotal': false,
        'orderno': 7,
        'isak': false,
        'display': 'text',
        'scale': 0,
        'type': 'NUMBER',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'DL_B_PUR_REQ_ID',
        'isuppercase': false,
        'isnotnull': false,
        'ismodify': false,
        'name': '采购需求单ID',
        'inputname': 'DL_B_PUR_REQ_ID'
      }, {
        'issubtotal': false,
        'orderno': 8,
        'isak': false,
        'display': 'text',
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'DL_B_PUR_REQ_BILL_NO',
        'isuppercase': false,
        'isnotnull': false,
        'ismodify': false,
        'name': '采购需求单号',
        'inputname': 'DL_B_PUR_REQ_BILL_NO'
      }, {
        'issubtotal': false,
        'reftable': 'PS_C_PRODIM_ITEM',
        'orderno': 10,
        'isak': false,
        'display': 'text',
        'reftableid': 23156,
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': true,
        'colname': 'PRO_TYPE_DEPART_ID',
        'isuppercase': false,
        'isnotnull': false,
        'fkdesc': '商品属性值',
        'ismodify': false,
        'name': '品类',
        'fkdisplay': 'drp',
        'inputname': 'PRO_TYPE_DEPART_ID',
        'isfk': true,
        'objdistype': 'object'
      }, {
        'issubtotal': false,
        'orderno': 20,
        'isak': false,
        'display': 'text',
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': true,
        'colname': 'PS_C_SKU_ECODE',
        'isuppercase': true,
        'isnotnull': false,
        'ismodify': false,
        'name': '条码',
        'inputname': 'PS_C_SKU_ECODE'
      }, {
        'issubtotal': false,
        'orderno': 30,
        'isak': false,
        'display': 'text',
        'type': 'STRING',
        'datelimit': 'all',
        'customerurl': {
          'tableurl': 'custompage/discription',
          'refobjid': 'PS_C_PRO_ECODE,CP_C_DISTRIB_ID',
          'reftabdesc': '商品详情',
          'objdistype': 'popwin'
        },
        'isfilter': false,
        'colname': 'PS_C_PRO_ECODE',
        'isuppercase': false,
        'isnotnull': false,
        'ismodify': false,
        'name': '商品编码',
        'inputname': 'PS_C_PRO_ECODE'
      }, {
        'issubtotal': false,
        'orderno': 31,
        'isak': false,
        'display': 'text',
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'PS_C_PRO_ENAME',
        'isuppercase': false,
        'isnotnull': false,
        'ismodify': false,
        'name': '商品名称',
        'inputname': 'PS_C_PRO_ENAME'
      }, {
        'issubtotal': false,
        'reftable': 'PS_C_CLR',
        'orderno': 50,
        'isak': false,
        'display': 'text',
        'reftableid': 23086,
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'PS_C_CLR_ID',
        'isuppercase': false,
        'isnotnull': false,
        'fkdesc': '颜色',
        'ismodify': false,
        'name': '颜色',
        'fkdisplay': 'drp',
        'inputname': 'PS_C_CLR_ID',
        'isfk': true,
        'objdistype': 'object'
      }, {
        'issubtotal': false,
        'reftable': 'PS_C_SIZE',
        'orderno': 60,
        'isak': false,
        'display': 'text',
        'reftableid': 23091,
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'PS_C_SIZE_ID',
        'isuppercase': true,
        'isnotnull': true,
        'fkdesc': '尺寸',
        'ismodify': false,
        'name': '尺寸',
        'fkdisplay': 'drp',
        'inputname': 'PS_C_SIZE_ID',
        'isfk': true,
        'objdistype': 'object'
      }, {
        'issubtotal': true,
        'orderno': 70,
        'isak': false,
        'display': 'text',
        'scale': 2,
        'type': 'NUMBER',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'DPRICE_LIST',
        'isuppercase': false,
        'isnotnull': true,
        'ismodify': false,
        'name': '吊牌价',
        'inputname': 'DPRICE_LIST'
      }, {
        'issubtotal': true,
        'orderno': 90,
        'isak': false,
        'display': 'text',
        'scale': 2,
        'type': 'NUMBER',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'PRICE_ACTUAL',
        'isuppercase': false,
        'isnotnull': true,
        'ismodify': false,
        'name': '采购价',
        'inputname': 'PRICE_ACTUAL'
      }, {
        'issubtotal': false,
        'orderno': 100,
        'isak': false,
        'display': 'text',
        'scale': 0,
        'type': 'NUMBER',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'CP_C_STORE_ID',
        'isuppercase': false,
        'isnotnull': false,
        'ismodify': false,
        'name': '店仓ID',
        'inputname': 'CP_C_STORE_ID'
      }, {
        'issubtotal': false,
        'orderno': 101,
        'isak': false,
        'display': 'text',
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'CP_C_STORE_ECODE',
        'isuppercase': false,
        'isnotnull': true,
        'ismodify': false,
        'name': '店仓编码',
        'inputname': 'CP_C_STORE_ECODE'
      }, {
        'issubtotal': true,
        'orderno': 110,
        'isak': false,
        'display': 'text',
        'scale': 0,
        'type': 'NUMBER',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'QTY_EXEC',
        'isuppercase': false,
        'isnotnull': true,
        'ismodify': false,
        'name': '执行数量',
        'inputname': 'QTY_EXEC'
      }, {
        'issubtotal': false,
        'orderno': 120,
        'isak': false,
        'display': 'text',
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'SKU_REQ_REMARK',
        'isuppercase': false,
        'isnotnull': false,
        'ismodify': false,
        'name': '条码需求原因',
        'inputname': 'SKU_REQ_REMARK'
      }, {
        'issubtotal': false,
        'orderno': 130,
        'isak': false,
        'display': 'text',
        'scale': 0,
        'type': 'NUMBER',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'DL_B_PUR_ORDER_ID',
        'isuppercase': false,
        'isnotnull': false,
        'ismodify': false,
        'name': '采购订单ID',
        'inputname': 'DL_B_PUR_ORDER_ID'
      }, {
        'issubtotal': false,
        'orderno': 131,
        'isak': false,
        'display': 'text',
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'DL_B_PUR_ORDER_BILL_NO',
        'isuppercase': false,
        'isnotnull': true,
        'ismodify': false,
        'name': '采购订单编号',
        'inputname': 'DL_B_PUR_ORDER_BILL_NO'
      }, {
        'issubtotal': true,
        'orderno': 180,
        'isak': false,
        'display': 'text',
        'scale': 2,
        'type': 'NUMBER',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'AMT_ACTUAL',
        'isuppercase': false,
        'isnotnull': true,
        'ismodify': false,
        'name': '采购金额',
        'inputname': 'AMT_ACTUAL'
      }, {
        'issubtotal': false,
        'reftable': 'USERS',
        'orderno': 1001,
        'isak': false,
        'display': 'text',
        'reftableid': 10085,
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'OWNERID',
        'isuppercase': false,
        'isnotnull': false,
        'fkdesc': '用户档案',
        'ismodify': false,
        'name': '创建人',
        'fkdisplay': 'drp',
        'inputname': 'OWNERID',
        'isfk': true,
        'objdistype': 'object'
      }, {
        'issubtotal': false,
        'orderno': 1003,
        'isak': false,
        'display': 'OBJ_DATE',
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'CREATIONDATE',
        'isuppercase': false,
        'isnotnull': false,
        'ismodify': false,
        'name': '创建时间',
        'inputname': 'CREATIONDATE'
      }, {
        'issubtotal': false,
        'reftable': 'USERS',
        'orderno': 1005,
        'isak': false,
        'display': 'text',
        'reftableid': 10085,
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'MODIFIERID',
        'isuppercase': false,
        'isnotnull': false,
        'fkdesc': '用户档案',
        'ismodify': false,
        'name': '修改人',
        'fkdisplay': 'drp',
        'inputname': 'MODIFIERID',
        'isfk': true,
        'objdistype': 'object'
      }, {
        'issubtotal': false,
        'orderno': 1007,
        'isak': false,
        'display': 'OBJ_DATE',
        'type': 'STRING',
        'datelimit': 'all',
        'isfilter': false,
        'colname': 'MODIFIEDDATE',
        'isuppercase': false,
        'isnotnull': false,
        'ismodify': false,
        'name': '修改时间',
        'inputname': 'MODIFIEDDATE'
      }],
      'totalRowCount': 4,
      'rowCount': 4,
      'row': [{
        'PRO_TYPE_DEPART_ID': {
          'val': '',
          'reftablename': 'PS_C_PRODIM_ITEM',
          'reftableid': 23156,
          'reftabdesc': '商品属性值',
          'refobjid': -1,
          'colid': 155525,
          'isfk': true
        },
        'PS_C_PRO_ECODE': { 'val': '18T1003' },
        'DL_B_PUR_ORDER_BILL_NO': { 'val': '' },
        'OWNERID': {
          'val': '系统管理员',
          'reftablename': 'USERS',
          'reftableid': 10085,
          'reftabdesc': '用户档案',
          'refobjid': '893',
          'colid': 155549,
          'isfk': true
        },
        'CREATIONDATE': { 'val': '2018-06-25 11:18:44' },
        'DL_B_PUR_REQ_ID': { 'val': '2169' },
        'PRICE_ACTUAL': { 'val': '39.00' },
        'PS_C_PRO_ENAME': { 'val': '男休闲T恤' },
        'SKU_REQ_REMARK': { 'val': '' },
        'DPRICE_LIST': { 'val': '' },
        'MODIFIEDDATE': { 'val': '2018-06-25 11:18:44' },
        'DL_B_PUR_REQ_BILL_NO': { 'val': 'PU0118062500003' },
        'PS_C_SKU_ECODE': { 'val': '18T10030906' },
        'CP_C_STORE_ID': { 'val': '206581079011' },
        'PS_C_SIZE_ID': {
          'val': '[06]L',
          'reftablename': 'PS_C_SIZE',
          'reftableid': 23091,
          'reftabdesc': '尺寸',
          'refobjid': 1020,
          'colid': 155531,
          'isfk': true
        },
        'DL_B_PUR_ORDER_ID': { 'val': '' },
        'CP_C_STORE_ECODE': { 'val': '00301' },
        'AMT_ACTUAL': { 'val': '39.00' },
        'MODIFIERID': {
          'val': '系统管理员',
          'reftablename': 'USERS',
          'reftableid': 10085,
          'reftabdesc': '用户档案',
          'refobjid': '893',
          'colid': 155551,
          'isfk': true
        },
        'ID': { 'val': '1138' },
        'PS_C_CLR_ID': {
          'val': '黑色',
          'reftablename': 'PS_C_CLR',
          'reftableid': 23086,
          'reftabdesc': '颜色',
          'refobjid': '1122',
          'colid': 155530,
          'isfk': true
        },
        'QTY_EXEC': { 'val': '1' }
      }, {
        'PRO_TYPE_DEPART_ID': {
          'val': '男上',
          'reftablename': 'PS_C_PRODIM_ITEM',
          'reftableid': 23156,
          'reftabdesc': '商品属性值',
          'refobjid': '7537',
          'colid': 155525,
          'isfk': true
        },
        'PS_C_PRO_ECODE': { 'val': '18T5048' },
        'DL_B_PUR_ORDER_BILL_NO': { 'val': '' },
        'OWNERID': {
          'val': '系统管理员',
          'reftablename': 'USERS',
          'reftableid': 10085,
          'reftabdesc': '用户档案',
          'refobjid': '893',
          'colid': 155549,
          'isfk': true
        },
        'CREATIONDATE': { 'val': '2018-06-25 11:18:44' },
        'DL_B_PUR_REQ_ID': { 'val': '2170' },
        'PRICE_ACTUAL': { 'val': '98.00' },
        'PS_C_PRO_ENAME': { 'val': '女休闲T恤11' },
        'SKU_REQ_REMARK': { 'val': '' },
        'DPRICE_LIST': { 'val': '' },
        'MODIFIEDDATE': { 'val': '2018-06-25 11:18:44' },
        'DL_B_PUR_REQ_BILL_NO': { 'val': 'PU0118062500004' },
        'PS_C_SKU_ECODE': { 'val': '18T50480104' },
        'CP_C_STORE_ID': { 'val': '206581079022' },
        'PS_C_SIZE_ID': {
          'val': '[04]S',
          'reftablename': 'PS_C_SIZE',
          'reftableid': 23091,
          'reftabdesc': '尺寸',
          'refobjid': 1018,
          'colid': 155531,
          'isfk': true
        },
        'DL_B_PUR_ORDER_ID': { 'val': '' },
        'CP_C_STORE_ECODE': { 'val': '00002' },
        'AMT_ACTUAL': { 'val': '98.00' },
        'MODIFIERID': {
          'val': '系统管理员',
          'reftablename': 'USERS',
          'reftableid': 10085,
          'reftabdesc': '用户档案',
          'refobjid': '893',
          'colid': 155551,
          'isfk': true
        },
        'ID': { 'val': '1139' },
        'PS_C_CLR_ID': {
          'val': '白色',
          'reftablename': 'PS_C_CLR',
          'reftableid': 23086,
          'reftabdesc': '颜色',
          'refobjid': '1134',
          'colid': 155530,
          'isfk': true
        },
        'QTY_EXEC': { 'val': '1' }
      }, {
        'PRO_TYPE_DEPART_ID': {
          'val': '男上',
          'reftablename': 'PS_C_PRODIM_ITEM',
          'reftableid': 23156,
          'reftabdesc': '商品属性值',
          'refobjid': '7537',
          'colid': 155525,
          'isfk': true
        },
        'PS_C_PRO_ECODE': { 'val': '18T5048' },
        'DL_B_PUR_ORDER_BILL_NO': { 'val': '' },
        'OWNERID': {
          'val': '系统管理员',
          'reftablename': 'USERS',
          'reftableid': 10085,
          'reftabdesc': '用户档案',
          'refobjid': '893',
          'colid': 155549,
          'isfk': true
        },
        'CREATIONDATE': { 'val': '2018-06-25 11:18:44' },
        'DL_B_PUR_REQ_ID': { 'val': '2170' },
        'PRICE_ACTUAL': { 'val': '98.00' },
        'PS_C_PRO_ENAME': { 'val': '女休闲T恤11' },
        'SKU_REQ_REMARK': { 'val': '' },
        'DPRICE_LIST': { 'val': '' },
        'MODIFIEDDATE': { 'val': '2018-06-25 11:18:44' },
        'DL_B_PUR_REQ_BILL_NO': { 'val': 'PU0118062500004' },
        'PS_C_SKU_ECODE': { 'val': '18T50480105' },
        'CP_C_STORE_ID': { 'val': '206581079022' },
        'PS_C_SIZE_ID': {
          'val': '[05]M',
          'reftablename': 'PS_C_SIZE',
          'reftableid': 23091,
          'reftabdesc': '尺寸',
          'refobjid': 1019,
          'colid': 155531,
          'isfk': true
        },
        'DL_B_PUR_ORDER_ID': { 'val': '' },
        'CP_C_STORE_ECODE': { 'val': '00002' },
        'AMT_ACTUAL': { 'val': '98.00' },
        'MODIFIERID': {
          'val': '系统管理员',
          'reftablename': 'USERS',
          'reftableid': 10085,
          'reftabdesc': '用户档案',
          'refobjid': '893',
          'colid': 155551,
          'isfk': true
        },
        'ID': { 'val': '1140' },
        'PS_C_CLR_ID': {
          'val': '白色',
          'reftablename': 'PS_C_CLR',
          'reftableid': 23086,
          'reftabdesc': '颜色',
          'refobjid': '1134',
          'colid': 155530,
          'isfk': true
        },
        'QTY_EXEC': { 'val': '1' }
      }, {
        'PRO_TYPE_DEPART_ID': {
          'val': '男上',
          'reftablename': 'PS_C_PRODIM_ITEM',
          'reftableid': 23156,
          'reftabdesc': '商品属性值',
          'refobjid': '7537',
          'colid': 155525,
          'isfk': true
        },
        'PS_C_PRO_ECODE': { 'val': '18T5048' },
        'DL_B_PUR_ORDER_BILL_NO': { 'val': '' },
        'OWNERID': {
          'val': '系统管理员',
          'reftablename': 'USERS',
          'reftableid': 10085,
          'reftabdesc': '用户档案',
          'refobjid': '893',
          'colid': 155549,
          'isfk': true
        },
        'CREATIONDATE': { 'val': '2018-06-25 11:18:44' },
        'DL_B_PUR_REQ_ID': { 'val': '2174' },
        'PRICE_ACTUAL': { 'val': '98.00' },
        'PS_C_PRO_ENAME': { 'val': '女休闲T恤11' },
        'SKU_REQ_REMARK': { 'val': '' },
        'DPRICE_LIST': { 'val': '' },
        'MODIFIEDDATE': { 'val': '2018-06-25 11:18:44' },
        'DL_B_PUR_REQ_BILL_NO': { 'val': 'PU0118062500008' },
        'PS_C_SKU_ECODE': { 'val': '18T50480104' },
        'CP_C_STORE_ID': { 'val': '206598865110' },
        'PS_C_SIZE_ID': {
          'val': '[04]S',
          'reftablename': 'PS_C_SIZE',
          'reftableid': 23091,
          'reftabdesc': '尺寸',
          'refobjid': 1018,
          'colid': 155531,
          'isfk': true
        },
        'DL_B_PUR_ORDER_ID': { 'val': '' },
        'CP_C_STORE_ECODE': { 'val': '15151' },
        'AMT_ACTUAL': { 'val': '98.00' },
        'MODIFIERID': {
          'val': '系统管理员',
          'reftablename': 'USERS',
          'reftableid': 10085,
          'reftabdesc': '用户档案',
          'refobjid': '893',
          'colid': 155551,
          'isfk': true
        },
        'ID': { 'val': '1141' },
        'PS_C_CLR_ID': {
          'val': '白色',
          'reftablename': 'PS_C_CLR',
          'reftableid': 23086,
          'reftabdesc': '颜色',
          'refobjid': '1134',
          'colid': 155530,
          'isfk': true
        },
        'QTY_EXEC': { 'val': '1' }
      }],
      'selectrange': [10, 20, 30, 50, 100],
      'queryDesc': ' (需求执行单ID= 82) ',
      'defaultrange': 10,
      'objdistype': null
    }
  };

const displayedColumns = [
  'PS_C_SKU_ECODE', // 条码
  'DL_B_PUR_REQ_BILL_NO', // 单据编号
  'DL_B_PUR_REQ_BILL_TYPE  ', // 需求类型
  'CP_C_STORE_ECODE', // 店仓
  'PS_C_PRO_ECODE', // 商品编码
  'PS_C_PRO_ENAME', // 商品名称
  'PS_C_CLR_ID', // 颜色
  'PS_C_SIZE_ID', // 尺寸
  'QTY_REQ_BILL ', // 需求数量
  'QTY_EXEC', // 采购数量
  'SKU_REQ_REMARK', // 条码需求原因
  'DL_B_PUR_ORDER_BILL_NO', // 采购订单编号
]; // 所有允许被展示的列

const result = data.datas.tabth
  .filter(d => {
    const indexSequence = displayedColumns.indexOf(d.colname);
    if (indexSequence > -1) {
      d.indexSequence = indexSequence;
      return true;
    }
  })
  .map(d => { d.valueField = `${d.colname}.val`; return { name: d.name, colname: d.colname, indexSequence: d.indexSequence }; })
  .sort((a, b) => a.indexSequence - b.indexSequence );
console.log(result);
