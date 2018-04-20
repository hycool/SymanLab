import Vue from 'vue';
import AgGridTableBasePureStaging from './AgGridTableBasePure-Staging.vue';
import TestAgGridForTable from './TestAgGridForTable.vue';
import { LicenseManager } from "ag-grid-enterprise/main";

// 设置enterprise key
LicenseManager.setLicenseKey("Evaluation_License_Valid_Until_6_June_2018__MTUyODIzOTYwMDAwMA==4c69615c372b7cdc6c4bda8601ac106b");

const appId3 = `appId${Math.round(Math.random() * 100000000000)}`;

const getRandomId = () => `appId-${Math.round(Math.random() * 100000000000)}`;

Vue.config.productionTip = false;

const createRootDom = (appId) => {
  const root = document.createElement('div');
  root.setAttribute('id', appId + '');
  document.body.appendChild(root);
};

// 用于测试列表用途的ag-Grid的基于Vue的实现
const renderAgDemoForTable = () => {
  const appId = getRandomId();
  createRootDom(appId);
  new Vue({
    render: c => c(TestAgGridForTable)
  }).$mount(`#${appId}`);
};

const renderAgDemoForReport = () => {
  createRootDom(appId3);
  new Vue({
    render: c => c(AgGridTableBasePureStaging)
  }).$mount(`#${appId3}`);
};

const init = () => {
  // renderAgDemoForTable();
  renderAgDemoForReport();
};

init();
