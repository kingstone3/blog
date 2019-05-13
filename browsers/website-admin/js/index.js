import Vue from 'vue';
import i18n from '<utils>/i18n';
import io from 'socket.io-client';

import '<utils>/importBaseComponents';

import App from './app';


// socket.io 每个 url 中默认带的 t,sid 等是用来维护 ws 连接的参数，对 app 没有什么用
// io.connect('/', {
//   query: {
//     uid: 'uid',
//   }
// })

new Vue({
  el: '#app',
  render: h => h(App)
});
