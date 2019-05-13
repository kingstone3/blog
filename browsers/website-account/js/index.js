import Vue from 'vue';
import i18n from '<utils>/i18n';

import App from './app';

new Vue({
  i18n,
  el: '#app',
  render: h => h(App)
});
