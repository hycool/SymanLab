
const fs = require('fs');
const readLine = require('readline');
const readStream = fs.createReadStream('../assets/exportCsv.csv');

const resultFilePath = '../assets/resultCsv.csv';
const groupNumber = 3;

const resultArray = [];

readLine.createInterface({
  input: readStream,
  crlfDelay: Infinity
}).on('line', (line) => {
  const row = line.replace(/"/g, '').split(',');
  const dropped = row[groupNumber - 1] === '';
  if (!dropped) {
    const firstColumnText = row[0].replace(/\s/g, '').split('->')[1] ? row[0].replace(/\s/g, '').split('->')[1] : row[0];
    row[0] = firstColumnText;
    resultArray.push(row);
  }
}).on('close', function() {
  resultArray.forEach((d, i) => {
    for (let j = 0; j < groupNumber - 1; j++) {
      if (d[j] === '') { d[j] = resultArray[i - 1][j]; }
    }
  });
  resultArray.forEach(d => {
    fs.appendFileSync(resultFilePath, `${d.toString()}\r\n`);
  })
});
