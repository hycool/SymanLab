import Vue from 'vue';
import CustomizeReport from './CustomizeReport.vue';

const getRandomId = () => `appId-${Math.round(Math.random() * 100000000000)}`;

const createRootDom = (appId) => {
  const root = document.createElement('div');
  root.setAttribute('id', appId + '');
  document.body.appendChild(root);
};

// 用于测试列表用途的ag-Grid的基于Vue的实现
const renderCustomizeReport = () => {
  const appId = getRandomId();
  createRootDom(appId);
  new Vue({
    render: c => c(CustomizeReport)
  }).$mount(`#${appId}`);
};


const init = () => {
  renderCustomizeReport();
};

init();
