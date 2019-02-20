let Notice = null;
const socketMap  = {}; //用户对应socket.id

//初始化socket连接
export function init(io) {
  // 每当一个新的 websocket 连接建立起来的时候，调用 use 的 callback
  // 虽然整个 socket 是在 socket.io/ path 下，但是 socket 实例的 namespace 是再下一层，具体值由建立 socket 时传入。
  io.use(function(socket, next){
    const {uid} = socket.request._query;

    // TODO:
    //   之后加上了 token 后可以通过 token 查找出用户 uid，
    //   再在下面的 socket.request.header 中加入查找到的 uid 就可以了，
    //   就不需要在 url 里传入 uid 了
    // if (validate(token)) {

    if (uid) {
      // 加入 token 后用 token 查找到的 uid 代替 'user'
      socket.request.headers.uid = uid;

      return next();
    } else {
      return next(new Error('WebSocket Error: Miss param <uid>'));
    }
  });

  Notice = io.on('connection', function(socket) {
    const {uid} = socket.handshake.headers;

    if (uid) {
      socketMap[uid] = socket.id;
    }

    socket.on('disconnect', function() {
      delete socketMap[uid];
    });
  });
}

// 其他模块调用，发送消息
export function send(type, detail) {
  const {uid} = detail;
  const socket_id = socketMap[uid];

  Notice.to(socket_id).emit(type, detail);
}
