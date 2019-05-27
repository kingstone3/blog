export default {
  changeState(state, payload) {
    state.state = payload.state;
  },

  reviceData(state, payload) {
    state.previous = state.current;
    state.current = payload;
    state.history.push(payload);
  },
}
