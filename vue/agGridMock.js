const booleanCleaner = (value) => {
  if (value === "true" || value === true || value === 1) {
    return true;
  } else if (value === "false" || value === false || value === 0) {
    return false;
  } else {
    return null;
  }
};

const currencyFormatter = (params) => {
  if (params.value === null || params.value === undefined) {
    return null;
  } else if (isNaN(params.value)) {
    return 'NaN';
  } else {
    // if we are doing 'count', then we do not show pound sign
    if (params.node.group && params.column.aggFunc === 'count') {
      return params.value;
    } else {
      return '$' + Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }
};

const booleanComparator = (value1, value2) => {
  const value1Cleaned = booleanCleaner(value1);
  const value2Cleaned = booleanCleaner(value2);
  const value1Ordinal = value1Cleaned === true ? 0 : (value1Cleaned === false ? 1 : 2);
  const value2Ordinal = value2Cleaned === true ? 0 : (value2Cleaned === false ? 1 : 2);
  return value1Ordinal - value2Ordinal;
};

const numberParser = (params) => {
  const newValue = params.newValue;
  let valueAsNumber;
  if (newValue === null || newValue === undefined || newValue === '') {
    valueAsNumber = null;
  } else {
    valueAsNumber = parseFloat(params.newValue);
  }
  return valueAsNumber;
};

const currencyCssFunc = (params) => {
  if (params.value !== null && params.value !== undefined && params.value < 0) {
    return { "color": "red", "font-weight": "bold" };
  } else {
    return {};
  }
};

const pseudoRandom = () => {
  let seed = 123456789;
  const m = Math.pow(2, 32);
  const a = 1103515245;
  const c = 12345;
  seed = (a * seed + c) % m;
  return seed / m;
};

const createRowItem = (row, colCount) => {
  const rowItem = {};

  //create data for the known columns
  const countriesToPickFrom = Math.floor(countries.length * ((row % 3 + 1) / 3));
  const countryData = countries[(row * 19) % countriesToPickFrom];
  rowItem.country = countryData.country;
  rowItem.continent = countryData.continent;
  rowItem.language = countryData.language;

  const firstName = firstNames[row % firstNames.length];
  const lastName = lastNames[row % lastNames.length];
  rowItem.name = firstName + " " + lastName;

  rowItem.game = {
    name: games[Math.floor(row * 13 / 17 * 19) % games.length],
    bought: booleanValues[row % booleanValues.length]
  };

  rowItem.bankBalance = ((Math.round(pseudoRandom() * 10000000)) / 100) - 3000;
  rowItem.rating = (Math.round(pseudoRandom() * 5));

  let totalWinnings = 0;
  months.forEach(function (month) {
    const value = ((Math.round(pseudoRandom() * 10000000)) / 100) - 20;
    rowItem[month.toLocaleLowerCase()] = value;
    totalWinnings += value;
  });
  rowItem.totalWinnings = totalWinnings;

  //create dummy data for the additional columns
  for (let col = defaultCols.length; col < colCount; col++) {
    let value;
    const randomBit = pseudoRandom().toString().substring(2, 5);
    value = colNames[col % colNames.length] + "-" + randomBit + " - (" + (row + 1) + "," + col + ")";
    rowItem["col" + col] = value;
  }

  console.log(rowItem);

  return rowItem;
};

const countryCellRenderer = (params) => {
  //get flags from here: http://www.freeflagicons.com/
  if (params.value === "" || params.value === undefined || params.value === null) {
    return '';
  } else {
    const flag = '<img class="flag" border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' + COUNTRY_CODES[params.value] + '.png">';
    return flag + ' ' + params.value;
  }
};

const CountryFloatingFilterComponent = () => {};

const booleanCellRenderer = (params) => {
  count++;
  if (count <= 1) {
    // params.api.onRowHeightChanged();
  }

  let valueCleaned = booleanCleaner(params.value);
  if (valueCleaned === true) {
    return "<span title='true' class='ag-icon ag-icon-tick content-icon'></span>";
  } else if (valueCleaned === false) {
    return "<span title='false' class='ag-icon ag-icon-cross content-icon'></span>";
  } else if (params.value !== null && params.value !== undefined) {
    return params.value.toString();
  } else {
    return null;
  }
};

const booleanFilterCellRenderer = (params) => {
  let valueCleaned = booleanCleaner(params.value);
  if (valueCleaned === true) {
    return "<span title='true' class='ag-icon ag-icon-tick content-icon'></span>";
  } else if (valueCleaned === false) {
    return "<span title='false' class='ag-icon ag-icon-cross content-icon'></span>";
  } else {
    return "(empty)";
  }
};

const ratingRendererGeneral = (value, forFilter) => {
  let result = '<span>';
  for (let i = 0; i < 5; i++) {
    if (value > i) {
      result += '<img src="images/star.svg" class="star" width=12 height=12 />';
    }
  }
  if (forFilter && value === 0) {
    result += '(no stars)';
  }
  result += '</span>';
  return result;
};

const ratingRenderer = (params) => {
  return ratingRendererGeneral(params.value, false)
};

const ratingFilterRenderer = (params) => {
  return ratingRendererGeneral(params.value, true)
};

const suppressColumnMoveAnimation = () => {
  const isFirefox = typeof InstallTrigger !== 'undefined';
  // At least Safari 3+: "[object HTMLElementConstructor]"
  const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  // Internet Explorer 6-11
  const isIE = /*@cc_on!@*/false || !!document.documentMode;

  return isFirefox || isSafari || isIE;
};

const rowSelected = (event) => {
  // the number of rows selected could be huge, if the user is grouping and selects a group, so
  // to stop the console from clogging up, we only print if in the first 10 (by chance we know
  // the node id's are assigned from 0 upwards)
  if (event.node.id < 10) {
    let valueToPrint = event.node.group ? 'group (' + event.node.key + ')' : event.node.data.name;
    console.log("Callback rowSelected: " + valueToPrint + " - " + event.node.isSelected());
  }
};

const selectionChanged = (event) => {
  console.log('Callback selectionChanged: selection count = ' + gridOptions.api.getSelectedNodes().length);
};

const getContextMenuItems = (params) => {
  if (params.node == null) return null;
  let result = params.defaultItems.splice(0);
  result.push(
    {
      name: 'Custom Menu Item',
      icon: '<img src="images/lab.svg" style="width: 14px;"/>',
      //shortcut: 'Alt + M',
      action: function () {
        var value = params.value ? params.value : '<empty>';
        window.alert('You clicked a custom menu item on cell ' + value);
      }
    }
  );
  return result;
};

const createCols = () => {
  const colCount = 22; // 22 列
  // start with a copy of the default cols
  const columns = defaultCols.slice(0, colCount);

  // there are 22 cols by default
  for (let col = 22; col < colCount; col++) {
    const colName = colNames[col % colNames.length];
    const colDef = { headerName: colName, field: "col" + col, width: 200, editable: true };
    columns.push(colDef);
  }
  return columns;
};

const createData = () => {
  const rowCount = 10;
  const colCount = 22;

  const data = [];

  for(let i = 0; i < rowCount; i++){
    const rowItem = createRowItem(i, colCount);
    data.push(rowItem);
  }
  return data;
};

const groupColumn = {
  headerName: "Group",
  width: 200,
  field: 'name',
  headerCheckboxSelection: true,
  headerCheckboxSelectionFilteredOnly: true,
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    checkbox: true
  }
};

const defaultCols = [
  {
    // column group 'Participant
    headerName: 'Participant',
    // marryChildren: true,
    children: [
      {
        headerName: 'Name',
        rowDrag: true,
        field: 'name',
        width: 200,
        editable: true,
        enableRowGroup: true,
        // enablePivot: true,
        filter: 'personFilter',
        floatingFilterComponent: 'personFloatingFilterComponent',
        checkboxSelection: function (params) {
          // we put checkbox on the name if we are not doing grouping
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          // we put checkbox on the name if we are not doing grouping
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelectionFilteredOnly: true
      },
      {
        headerName: "Language", field: "language", width: 150, editable: true, filter: 'agSetColumnFilter',
        cellEditor: 'agSelectCellEditor',
        enableRowGroup: true,
        enablePivot: true,
        // rowGroupIndex: 0,
        // pivotIndex: 0,
        cellEditorParams: {
          values: ['English', 'Spanish', 'French', 'Portuguese', 'German',
            'Swedish', 'Norwegian', 'Italian', 'Greek', 'Icelandic', 'Portuguese', 'Maltese']
        },
        // pinned: 'left',
        headerTooltip: "Example tooltip for Language",
        filterParams: {
          selectAllOnMiniFilter: true,
          newRowsAction: 'keep',
          clearButton: true
        }
      },
      {
        headerName: "Country", field: "country", width: 150, editable: true,
        cellRenderer: 'countryCellRenderer',
        // pivotIndex: 1,
        // rowGroupIndex: 1,
        enableRowGroup: true,
        enablePivot: true,
        cellEditor: 'agRichSelect',
        cellEditorParams: {
          cellRenderer: 'countryCellRenderer',
          values: ["Argentina", "Brazil", "Colombia", "France", "Germany", "Greece", "Iceland", "Ireland",
            "Italy", "Malta", "Portugal", "Norway", "Peru", "Spain", "Sweden", "United Kingdom",
            "Uruguay", "Venezuela", "Belgium", "Luxembourg"]
        },
        // pinned: 'left',
        floatCell: true,
        filterParams: {
          cellRenderer: 'countryCellRenderer',
          // cellHeight: 20,
          newRowsAction: 'keep',
          selectAllOnMiniFilter: true,
          clearButton: true
        },
        floatingFilterComponent: 'countryFloatingFilterComponent',
        icons: {
          sortAscending: '<i class="fa fa-sort-alpha-asc"/>',
          sortDescending: '<i class="fa fa-sort-alpha-desc"/>'
        }
      }
    ]
  },
  {
    // column group 'Game of Choice'
    headerName: 'Game of Choice',
    children: [
      {
        headerName: "Game Name", field: "game.name", width: 180, editable: true, filter: 'agSetColumnFilter',
        tooltipField: 'game.name',
        cellClass: function () {
          return 'alphabet';
        },
        filterParams: {
          selectAllOnMiniFilter: true,
          newRowsAction: 'keep',
          clearButton: true
        },
        enableRowGroup: true,
        enablePivot: true,
        // pinned: 'right',
        // rowGroupIndex: 1,
        icons: {
          sortAscending: '<i class="fa fa-sort-alpha-asc"/>',
          sortDescending: '<i class="fa fa-sort-alpha-desc"/>'
        }
      },
      {
        headerName: "Bought", field: "game.bought", filter: 'agSetColumnFilter', editable: true, width: 150,
        // pinned: 'right',
        // rowGroupIndex: 2,
        // pivotIndex: 1,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        cellRenderer: 'booleanCellRenderer', cellStyle: { "text-align": "center" }, comparator: booleanComparator,
        floatCell: true,
        filterParams: {
          cellRenderer: 'booleanFilterCellRenderer',
          selectAllOnMiniFilter: true,
          newRowsAction: 'keep',
          clearButton: true
        }
      }
    ]
  },
  {
    // column group 'Performance'
    headerName: 'Performance',
    groupId: 'performance',
    children: [
      {
        headerName: "Bank Balance", field: "bankBalance", width: 180, editable: true,
        filter: 'winningsFilter', valueFormatter: currencyFormatter,
        type: 'numericColumn',
        enableValue: true,
        // colId: 'sf',
        // valueGetter: '55',
        // aggFunc: 'sum',
        icons: {
          sortAscending: '<i class="fa fa-sort-amount-asc"/>',
          sortDescending: '<i class="fa fa-sort-amount-desc"/>'
        }
      },
      {
        headerName: "Extra Info 1", columnGroupShow: 'open', width: 150, editable: false,
        suppressSorting: true, suppressMenu: true, cellStyle: { "text-align": "right" },
        cellRenderer: function () { return 'Abra...'; }
      },
      {
        headerName: "Extra Info 2", columnGroupShow: 'open', width: 150, editable: false,
        suppressSorting: true, suppressMenu: true, cellStyle: { "text-align": "left" },
        cellRenderer: function () { return '...cadabra!'; }
      }
    ]
  },
  {
    headerName: "Rating", field: "rating", width: 120, editable: true, cellRenderer: 'ratingRenderer',
    floatCell: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    filterParams: { cellRenderer: 'ratingFilterRenderer' }
  },
  {
    headerName: "Total Winnings", field: "totalWinnings", filter: 'agNumberColumnFilter', type: 'numericColumn',
    editable: true, valueParser: numberParser, width: 170,
    // aggFunc: 'sum',
    enableValue: true,
    valueFormatter: currencyFormatter, cellStyle: currencyCssFunc,
    icons: {
      sortAscending: '<i class="fa fa-sort-amount-asc"/>',
      sortDescending: '<i class="fa fa-sort-amount-desc"/>'
    }
  }
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const colNames = [
  "Station",
  "Railway",
  "Street",
  "Address",
  "Toy",
  "Soft Box",
  "Make and Model",
  "Longest Day",
  "Shortest Night"
];

const countries = [
  { country: "Ireland", continent: "Europe", language: "English" },
  { country: "Spain", continent: "Europe", language: "Spanish" },
  { country: "United Kingdom", continent: "Europe", language: "English" },
  { country: "France", continent: "Europe", language: "French" },
  { country: "Germany", continent: "Europe", language: "German" },
  { country: "Luxembourg", continent: "Europe", language: "French" },
  { country: "Sweden", continent: "Europe", language: "Swedish" },
  { country: "Norway", continent: "Europe", language: "Norwegian" },
  { country: "Italy", continent: "Europe", language: "Italian" },
  { country: "Greece", continent: "Europe", language: "Greek" },
  { country: "Iceland", continent: "Europe", language: "Icelandic" },
  { country: "Portugal", continent: "Europe", language: "Portuguese" },
  { country: "Malta", continent: "Europe", language: "Maltese" },
  { country: "Brazil", continent: "South America", language: "Portuguese" },
  { country: "Argentina", continent: "South America", language: "Spanish" },
  { country: "Colombia", continent: "South America", language: "Spanish" },
  { country: "Peru", continent: "South America", language: "Spanish" },
  { country: "Venezuela", continent: "South America", language: "Spanish" },
  { country: "Uruguay", continent: "South America", language: "Spanish" },
  { country: "Belgium", continent: "Europe", language: "French" }
];

const firstNames = ["Tony", "Andrew", "Kevin", "Bricker", "Dimple", "Bas", "Sophie", "Isabelle", "Emily", "Olivia", "Lily", "Chloe", "Isabella",
  "Amelia", "Jessica", "Sophia", "Ava", "Charlotte", "Mia", "Lucy", "Grace", "Ruby",
  "Ella", "Evie", "Freya", "Isla", "Poppy", "Daisy", "Layla"];

const lastNames = ["Smith", "Connell", "Flanagan", "McGee", "Unalkat", "Rahman", "Beckham", "Black", "Braxton", "Brennan", "Brock", "Bryson", "Cadwell",
  "Cage", "Carson", "Chandler", "Cohen", "Cole", "Corbin", "Dallas", "Dalton", "Dane",
  "Donovan", "Easton", "Fisher", "Fletcher", "Grady", "Greyson", "Griffin", "Gunner",
  "Hayden", "Hudson", "Hunter", "Jacoby", "Jagger", "Jaxon", "Jett", "Kade", "Kane",
  "Keating", "Keegan", "Kingston", "Kobe"];

const games = ["Chess", "Cross and Circle", "Daldos", "Downfall", "DVONN", "Fanorona", "Game of the Generals", "Ghosts",
  "Abalone", "Agon", "Backgammon", "Battleship", "Blockade", "Blood Bowl", "Bul", "Camelot", "Checkers",
  "Go", "Gipf", "Guess Who?", "Hare and Hounds", "Hex", "Hijara", "Isola", "Janggi (Korean Chess)", "Le Jeu de la Guerre",
  "Patolli", "Plateau", "PUNCT", "Rithmomachy", "Sahkku", "Senet", "Shogi", "Space Hulk", "Stratego", "Sugoroku",
  "Tab", "Tablut", "Tantrix", "Wari", "Xiangqi (Chinese chess)", "YINSH", "ZERTZ", "Kalah", "Kamisado", "Liu po",
  "Lost Cities", "Mad Gab", "Master Mind", "Nine Men's Morris", "Obsession", "Othello"
];

const booleanValues = [true, "true", false, "false"];

const COUNTRY_CODES = {
  Ireland: "ie",
  Luxembourg: "lu",
  Belgium: "be",
  Spain: "es",
  "United Kingdom": "gb",
  France: "fr",
  Germany: "de",
  Sweden: "se",
  Italy: "it",
  Greece: "gr",
  Iceland: "is",
  Portugal: "pt",
  Malta: "mt",
  Norway: "no",
  Brazil: "br",
  Argentina: "ar",
  Colombia: "co",
  Peru: "pe",
  Venezuela: "ve",
  Uruguay: "uy"
};

const columnDefs = createCols();
const rowData = createData();

const PersonFilter = function() {};

PersonFilter.prototype.init = function (params) {
  this.valueGetter = params.valueGetter;
  this.filterText = null;
  this.params = params;
  this.setupGui();
};

// not called by ag-Grid, just for us to help setup
PersonFilter.prototype.setupGui = function () {
  this.gui = document.createElement('div');
  this.gui.innerHTML =
    '<div style="padding: 4px;">' +
    '<div style="font-weight: bold;">Custom Athlete Filter</div>' +
    '<div><input style="margin: 4px 0px 4px 0px;" type="text" id="filterText" placeholder="Full name search..."/></div>' +
    '<div style="margin-top: 20px; width: 200px;">This filter does partial word search on multiple words, e.g. "mich phel" still brings back Michael Phelps.</div>' +
    '<div style="margin-top: 20px; width: 200px;">Just to illustrate that anything can go in here, here is an image:</div>' +
    '<div><img src="images/ag-Grid2-200.png" style="width: 150px; text-align: center; padding: 10px; margin: 10px; border: 1px solid lightgrey;"/></div>' +
    '</div>';

  var that = this;
  this.onFilterChanged = function () {
    that.extractFilterText();
    that.params.filterChangedCallback();
  };

  this.eFilterText = this.gui.querySelector('#filterText');
  this.eFilterText.addEventListener("input", this.onFilterChanged);
};

PersonFilter.prototype.extractFilterText = function () {
  this.filterText = this.eFilterText.value;
};

PersonFilter.prototype.getGui = function () {
  return this.gui;
};

PersonFilter.prototype.doesFilterPass = function (params) {
  // make sure each word passes separately, ie search for firstname, lastname
  var passed = true;
  var valueGetter = this.valueGetter;
  this.filterText.toLowerCase().split(" ").forEach(function (filterWord) {
    var value = valueGetter(params);
    if (value.toString().toLowerCase().indexOf(filterWord) < 0) {
      passed = false;
    }
  });

  return passed;
};

PersonFilter.prototype.isFilterActive = function () {
  var isActive = this.filterText !== null && this.filterText !== undefined && this.filterText !== '';
  return isActive;
};

PersonFilter.prototype.getModelAsString = function (model) {
  return model ? model : '';
};

PersonFilter.prototype.getModel = function () {
  return this.eFilterText.value;
};

const PersonFloatingFilterComponent = function() {};

PersonFloatingFilterComponent.prototype.init = function (params) {
  this.params = params;
  this.eGui = document.createElement('input');
  var eGui = this.eGui;
  this.changeEventListener = function () {
    params.onFloatingFilterChanged(eGui.value);
  };
  this.eGui.addEventListener('input', this.changeEventListener);
};

PersonFloatingFilterComponent.prototype.getGui = function () {
  return this.eGui;
};

PersonFloatingFilterComponent.prototype.onParentModelChanged = function (model) {
  // add in child, one for each flat
  if (model) {
    this.eGui.value = model;
  } else {
    this.eGui.value = '';
  }
};

PersonFloatingFilterComponent.prototype.destroy = function () {
  this.eGui.removeEventListener('input', this.changeEventListener);
};

const WinningsFilter = function() {};

WinningsFilter.prototype.init = function (params) {

  var uniqueId = Math.random();
  this.filterChangedCallback = params.filterChangedCallback;
  this.eGui = document.createElement("div");
  this.eGui.innerHTML =
    '<div style="padding: 4px;">' +
    '<div style="font-weight: bold;">Example Custom Filter</div>' +
    '<div><label><input type="radio" name="filter"' + uniqueId + ' id="cbNoFilter">No filter</input></label></div>' +
    '<div><label><input type="radio" name="filter"' + uniqueId + ' id="cbPositive">Positive</input></label></div>' +
    '<div><label><input type="radio" name="filter"' + uniqueId + ' id="cbNegative">Negative</input></label></div>' +
    '<div><label><input type="radio" name="filter"' + uniqueId + ' id="cbGreater50">&gt; &pound;50,000</label></div>' +
    '<div><label><input type="radio" name="filter"' + uniqueId + ' id="cbGreater90">&gt; &pound;90,000</label></div>' +
    '</div>';
  this.cbNoFilter = this.eGui.querySelector('#cbNoFilter');
  this.cbPositive = this.eGui.querySelector('#cbPositive');
  this.cbNegative = this.eGui.querySelector('#cbNegative');
  this.cbGreater50 = this.eGui.querySelector('#cbGreater50');
  this.cbGreater90 = this.eGui.querySelector('#cbGreater90');
  this.cbNoFilter.checked = true; // initialise the first to checked
  this.cbNoFilter.onclick = this.filterChangedCallback;
  this.cbPositive.onclick = this.filterChangedCallback;
  this.cbNegative.onclick = this.filterChangedCallback;
  this.cbGreater50.onclick = this.filterChangedCallback;
  this.cbGreater90.onclick = this.filterChangedCallback;
  this.valueGetter = params.valueGetter;
};

WinningsFilter.prototype.getGui = function () {
  return this.eGui;
};

WinningsFilter.prototype.doesFilterPass = function (node) {
  var value = this.valueGetter(node);
  if (this.cbNoFilter.checked) {
    return true;
  } else if (this.cbPositive.checked) {
    return value >= 0;
  } else if (this.cbNegative.checked) {
    return value < 0;
  } else if (this.cbGreater50.checked) {
    return value >= 50000;
  } else if (this.cbGreater90.checked) {
    return value >= 90000;
  } else {
    console.error('invalid checkbox selection');
  }
};

WinningsFilter.prototype.isFilterActive = function () {
  return !this.cbNoFilter.checked;
};

WinningsFilter.prototype.getModelAsString = function (model) {
  return model ? model : '';
};

WinningsFilter.prototype.getModel = function () {
  if (this.cbNoFilter.checked) {
    return '';
  } else if (this.cbPositive.checked) {
    return 'value >= 0';
  } else if (this.cbNegative.checked) {
    return 'value < 0';
  } else if (this.cbGreater50.checked) {
    return 'value >= 50000';
  } else if (this.cbGreater90.checked) {
    return 'value >= 90000';
  } else {
    console.error('invalid checkbox selection');
  }
};
// lazy, the example doesn't use setModel()
WinningsFilter.prototype.setModel = function () { };


export {
  columnDefs,
  rowData,
  PersonFilter,
  PersonFloatingFilterComponent,
  WinningsFilter,
  groupColumn,
  countryCellRenderer,
  CountryFloatingFilterComponent,
  booleanCellRenderer,
  booleanFilterCellRenderer,
  ratingFilterRenderer,
  ratingRendererGeneral,
  ratingRenderer,
  suppressColumnMoveAnimation,
  rowSelected,
  selectionChanged,
  getContextMenuItems
};
