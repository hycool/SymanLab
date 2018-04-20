const columnDefs = [
  {headerName: "Make", field: "make"},
  {headerName: "Model", field: "model"},
  {headerName: "Price", field: "price"}
];

// specify the data
const rowData = [
  {make: "Toyota", model: "Celica", price: 35000},
  {make: "Ford", model: "Mondeo", price: 32000},
  {make: "Porsche", model: "Boxter", price: 72000}
];


const initAgGridTable = function () {
  const agGridDiv = document.createElement('div');
  const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
  };
  document.body.appendChild(agGridDiv);
  console.log('agGridDiv = ', agGridDiv);
  new window.agGrid.Grid(agGridDiv, gridOptions);
};

export default initAgGridTable;
