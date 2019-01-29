import Vue from 'vue';

import * as baseComponents from '<utils>/importBaseComponents';

import Components from './components';

new Vue({
  el: '#app',
  render: createElement => createElement(Components)
});
