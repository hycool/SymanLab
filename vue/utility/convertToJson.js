const fs = require('fs');
const readLine = require('readline');
const originPath = '../assets/inventoryCsv.csv';
const outputPath = '../assets/inventory.json';
const jsonFile = require('jsonfile');
const readStream = fs.createReadStream(originPath);
const outputData = [];

const rl = readLine.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const lineArray = line.split(',');
  const lineObject = {};
  lineObject.ecode = lineArray[0] || '';
  lineObject.sku = lineArray[1] || '';
  lineObject.color = lineArray[2] || '';
  lineObject.size = lineArray[3] || '';
  lineObject.amount = parseFloat(lineArray[4]) || 0;
  lineObject.tagprice = parseFloat(lineArray[5]) || 0;
  lineObject.retailprice = parseFloat(lineArray[6]) || 0;
  outputData.push(lineObject);
});

rl.on('close', () => {
  let data = [];
  for (let i = 0; i < 1; i++) {
    data = data.concat(outputData);
  }
  console.log(data.length);
  jsonFile.writeFileSync(outputPath, data);
});

