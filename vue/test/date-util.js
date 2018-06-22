const dateFormat = (d, separator) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate();
  return `${year}${separator || ''}${month}${separator || ''}${day}`;
};


console.log(dateFormat(new Date()));
