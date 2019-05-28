export default {
  changeState(state, payload) {
    state.state = payload.state;
  },

  reviceData(state, data) {
    state.history.unshift(data);
  },
}
