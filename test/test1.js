const currencyFormat = (value, decimal) => {
  const arr = `${value}`.split('.');
  return decimal ?
    `${Number(arr[0]) > 0? arr[0].replace(/(?=(?!^)(\d{3})+$)/g, ',') : '-' + String(Math.abs(arr[0])).replace(/(?=(?!^)(\d{3})+$)/g, ',')}.${arr[1] || ''}` :
    `${Number(arr[0]) > 0? arr[0].replace(/(?=(?!^)(\d{3})+$)/g, ',') : '-' + String(Math.abs(arr[0])).replace(/(?=(?!^)(\d{3})+$)/g, ',')}`;
};

console.log(currencyFormat('123456789'));
console.log(currencyFormat('-1234567890.124456', true));
