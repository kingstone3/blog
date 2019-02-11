import Vue from 'vue';

import * as baseComponents from '<utils>/importBaseComponents';

import App from './app';

new Vue({
  el: '#app',
  render: h => h(App)
});
