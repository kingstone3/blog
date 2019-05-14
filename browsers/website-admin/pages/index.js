import Vue from 'vue';
import io from 'socket.io-client';

import '<utils>/importBaseComponents';

import i18n from '<utils>/i18n';

import store from '<website-admin>/store';
import router from '<website-admin>/routes';


// socket.io 每个 url 中默认带的 t,sid 等是用来维护 ws 连接的参数，对 app 没有什么用
// io.connect('/', {
//   query: {
//     uid: 'uid',
//   }
// })

new Vue({
  store,
  router,
  i18n,
  el: '#app',
});
