var sockjs = require('sockjs');


function actionBuilder(action) {
  return function (detail) {
    return JSON.stringify({
      action,
      detail,
    });
  }
}

// const socketMap = {};

const connectHandler = (conn) => {
  // Check session
  // const { session_id: sessionId } = conn;

  // if (!sessionId) {
  //   conn.write(actionBuilder('BAD_REQUEST')({
  //     action: 'OPEN',
  //     detail: 'NO_SESSION_ID',
  //   }));

  //   conn.close();

  //   return;
  // }

  // const sessionSocket = socketMap[sessionId];
  // socketMap[sessionId] = Array.isArray(sessionSocket) ? sessionSocket.push(conn) : [conn];

  conn.on('data', dataHandler);

  conn.on('close', closeHandler);

  function dataHandler(msg) {
    const {action} = JSON.parse(msg);

    const actionSender = actionBuilder(action);

    switch(action) {
      case 'SOCKJS_TEST': {
        conn.write(actionSender({
          result: 'OK',
        }));

        break;
      }
      default: {
        conn.write(actionBuilder('BAD_REQUEST')({
          action,
          detail: 'ACTION_NOT_ALLOWED'
        }));
      }
    }
  }

  function closeHandler() {

  }
}

const install = (server) => {
  const socket = sockjs.createServer({
    prefix: '/sockjs',
  });

  socket.on('connection', connectHandler);

  socket.installHandlers(server);
}


// 注意判断 socketMap 里是否含有 sessionid
// const send = (action, detail) => {

// }

// const broadcast = (action, detail) => {

// }


module.exports = {
  install,
  // send,
  // broadcast,
}
