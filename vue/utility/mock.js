const mockColumnDefs = () => {
  const columnDefs = [
    {
      headerName: '姓名',
      field: 'name',
      enableRowGroup: true,
      rowDrag: true,
      width: 150,
      checkboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      }, // 设置单元格的checkbox
      headerCheckboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },  // 设置表头的checkbox
      headerCheckboxSelectionFilteredOnly: true, // 只选中在过滤条件内的数据
    },
    {
      headerName: '国家',
      field: 'country',
      enableRowGroup: true,
      width: 100
    },
    {
      headerName: '游戏名称',
      field: 'game',
      enableRowGroup: true,
      width: 100
    },
    {
      headerName: '是否购买',
      field: 'bought',
      enableRowGroup: true,
      width: 100,
      cellRenderer(params) {
        const { data, columnApi } = params;
        if (columnApi.getRowGroupColumns().length === 0) {
          return data.bought ? '√' : '×'
        }
      }
    },
    {
      headerName: '余额',
      field: 'bankBalance',
      width: 100
    },
    {
      headerName: '年度合计',
      width: 100,
      cellRenderer(params) {
        const data = params.data;
        if (params.columnApi.getRowGroupColumns().length === 0) {
          return data.m1 + data.m2 + data.m3 + data.m4 + data.m5 + data.m6 + data.m7 + data.m8 + data.m9 + data.m10 + data.m11 + data.m12;
        }
      }
    },
    {
      headerName: '月份',
      children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(d => ({
        headerName: `${d}月`,
        field: `m${d}`,
        enableValue: true,
        width: 100
      }))
    }
  ];
  return columnDefs;
};

const mockRowData = () => {
  const mockNumber = () => Math.round(Math.random() * 10000);
  const country = ['中国', '英国', '法国', '希腊', '南非', '以色列', '德国', '美国', '日本', '阿联酋'];
  const game = ['游戏一', '游戏二', '游戏三', '游戏四', '游戏五', '游戏六', '游戏七', '游戏八', '游戏九'];
  const rowData = [];
  for(let i = 0; i < 100; i++) {
    rowData.push({
      name: mock.Random.cname(),
      country: country[Math.round(Math.random() * 100) % country.length],
      game: game[Math.round(Math.random() * 100) % game.length],
      bought: (Math.round(Math.random() * 100) % 2) === 0,
      bankBalance: mockNumber(),
      m1: mockNumber(),
      m2: mockNumber(),
      m3: mockNumber(),
      m4: mockNumber(),
      m5: mockNumber(),
      m6: mockNumber(),
      m7: mockNumber(),
      m8: mockNumber(),
      m9: mockNumber(),
      m10: mockNumber(),
      m11: mockNumber(),
      m12: mockNumber(),
    });
  }
  return rowData;
};

export { mockColumnDefs, mockRowData };
