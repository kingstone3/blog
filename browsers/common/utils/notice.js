import SockJS from  'sockjs-client';

import { compose } from '<utils>/';


function actionBuilder(action, data) {
  return JSON.stringify(
    {
      action: action.toUpperCase(),
      data,
    }
  )
}

const initSocket = compose(
  registerCloseHandler,
  registerMessageHandler,
  registerOpenHandler,
  connect,
);

// TODO: Add sessionid config
function connect() {
  return new SockJS('/sockjs', [], {

  });
}

function registerOpenHandler(sockjs) {
  sockjs.addEventListener('open', () => {
    handleOpen();

    const timerId = setInterval(() => {
      try {
        sockjs.send(actionBuilder('SOCKJS_TEST'));
      } catch (err) {
        clearTimeout(timerId);

        initSocket();
      }
    }, 5000);
  });

  return sockjs;
}

function registerMessageHandler(sockjs) {
  sockjs.addEventListener('message', (e) => {
    handleMessage(JSON.parse(e.data));
  });

  return sockjs;
}

function registerCloseHandler(sockjs) {
  sockjs.addEventListener('close', () => {
    handleClose();
  });

  return sockjs;
}


function handleOpen() {
  window.dispatchEvent(new CustomEvent('WS_OPENED'));
}

function handleMessage({action, detail}) {
  window.dispatchEvent(new CustomEvent(`WS_${action}`, {
    detail,
  }));
}

function handleClose() {
  window.dispatchEvent(new CustomEvent('WS_CLOSED'));
}


initSocket();
