import SockJS from  'sockjs-client';
import _ from 'lodash';


function actionBuilder(action, data) {
  return JSON.stringify(
    {
      action: action.toUpperCase(),
      data,
    }
  )
}

export default {
  // Not real pure function
  connectWS({commit}) {
    const initSocket = _.flowRight(
      registerCloseHandler,
      registerMessageHandler,
      registerOpenHandler,
      connect
    );

    function connect() {
      return new SockJS('/sockjs', [], {});
    }

    let timerId;

    function registerOpenHandler(sockjs) {
      sockjs.addEventListener('open', () => {
        commit('changeState', {
          state: 'OPENED'
        });

        timerId = setInterval(() => {
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
        commit('reviceData', JSON.parse(e.data));
      });

      return sockjs;
    }

    function registerCloseHandler(sockjs) {
      sockjs.addEventListener('close', () => {
        commit('changeState', {
          state: 'CLOSED'
        });

        clearTimeout(timerId);
      });

      return sockjs;
    }

    initSocket();
  },
}
