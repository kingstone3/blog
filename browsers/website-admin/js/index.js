import Vue from 'vue';

import '<utils>/importBaseComponents';

import App from './app';

new Vue({
  el: '#app',
  render: h => h(App)
});
