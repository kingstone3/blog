import Vue from 'vue';

import '<utils>/importBaseComponents';

import i18n from '<utils>/i18n';

import store from '<website-account>/store';
import router from '<website-account>/routes';


new Vue({
  store,
  router,
  i18n,
  el: '#app',
});
