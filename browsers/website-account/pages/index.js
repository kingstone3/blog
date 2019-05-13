import Vue from 'vue';

import '<utils>/importBaseComponents';

import i18n from '<utils>/i18n';

import store from '<website-account>/store';

import App from './app';

new Vue({
  store,
  i18n,
  el: '#app',
  render: h => h(App)
});
