import SockJS from  'sockjs-client';
import Stomp from 'stompjs/lib/stomp';

import { compose } from '<utils>/';

let headers = {};

const initSocket = compose(
  createHeaders,
  autoCheckConnection,
  connect,
  createHeaders,
  createStomp
);

function createStomp(socket) {
  // 获取 STOMP 子协议的客户端对象
  let stomp = window.Stomp.over(socket);

  return stomp;
}

function createHeaders(stomp) {
  let headers = {};

  return {headers, stomp};
}

function connect({headers, stomp}) {
  // 向服务器发起websocket连接
  stomp.connect(headers, (frame) => {
    // 订阅服务端提供的某个topic
    stomp.subscribe('/topic/chat_msg', (msg) => {
      // msg.body存放的是服务端发送给我们的信息
    });
  }, (err) => {
    // 连接发生错误时的处理函数
    console.log(err);
  });

  return {headers, stomp};
};

function autoCheckConnection({headers, stomp}) {
  setInterval(() => {
    try {
      stomp.send('SOCKJS_TEST');
    } catch (err) {
      connect({headers, stomp});
    }
  }, 5000);
}

initSocket(new SockJS('/sockjs'));
