import Vue from 'vue';
import TableDemo from './table/tableDemo.vue';

Vue.config.productionTip = false;

const createRootDom = (appId) => {
  const root = document.createElement('div');
  root.setAttribute('id', appId + '');
  document.body.appendChild(root);
};

const renderTableDemo = () => {
  createRootDom('tableDemo');
  new Vue({
    render: c => c(TableDemo)
  }).$mount(`#tableDemo`);
};

const init = () => {
  renderTableDemo();
};

init();
