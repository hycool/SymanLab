const fs = require('fs');
const readLine = require('readline');
const readableFilePath = './readable.csv';
const readStream = fs.createReadStream(readableFilePath);

const rl = readLine.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

let lineNumber = 0;

rl.on('line', (line) => {
  const lineArray = line.split(',');
  const headers = [
    '序号', '门店ID', '门店名称', '补货周期', '商品编码', '大类', '商品性质', 'STYLENAME', '上市日期', '上市天数', 'NEWSTYLE', '条码排名', 'SIZEORDER', 'CLR', '颜色', '尺码', '条码', '现零售价', 'SKUFLAG', '前7天销售', '前6天销售', '前5天销售', '前4天销售', '前3天销售', '前2天销售', '前1天销售', '本周销量', '本周销售额', '陈列数量C', '销售目标库存D', '补货目标库存E=MAX(C,D)', '补货计划G=E-F', '在库数量', '在途数量', '店铺库存F', '整款销量', '整款库存', '整款销售金额', '滞销款', 'QTYSAFE1', 'QTYSTOCK1', '停止补货', 'STATE', '退货', 'RETSTATE', '退货数量', '补货', '特殊订单未计入量', '补货天花板A=MIN(A1,A2)', '门店权重系数', 'QTYSTOCKCLR', 'OLDQTYDISPLAY', 'IFMODIFYDISPLAY', 'QTYDISPLAYSTORE', 'QTYPLAN', 'QTYDIFF', '陈列标准', 'REMARK', '推广信息', 'LOWPRICE', 'QTYSTOCKING', 'STYLESALEFLAG', '整款排名', '退仓', '季节', '销售老化款', '款式', '性别', '标准价', '最近铺货日期', 'SPORADICSTYLE', 'MCLASS', '补货推广类型', '过量库存', '天花板上限A2', '其余六天平均B', '周最大日销量A1', 'STYLEATT12', 'PROVINCE', 'SALEAREA', '门店编码', '整款销售状态', 'SKU销售状态', '配销中心', '店铺清理类型', '原陈列数'
  ];
  headers.forEach((d, i) => {
    if (!lineArray[i]) {
      lineArray[i] = '';
    }
  });
  lineNumber = lineNumber + 1;
  console.log(`deal with line ${lineNumber}`);
  const fileIndex = 9;
  const pathAgGridTable = `csvDataForAgGridTable${fileIndex}.csv`;
  for(let j = 0; j < fileIndex; j++) {
    fs.appendFileSync(pathAgGridTable, `${lineArray.toString()}\r\n`);
  }
});


