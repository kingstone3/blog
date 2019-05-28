export default {
  current(state) {
    return state.history[0];
  },

  previous(state) {
    return state.history[1];
  },
}