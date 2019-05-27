import getters from './getters';
import actions from './actions';
import mutations from './mutations';


export default {
  namespaced: true,

  state() {
    return {
      state: 'CLOSED',
      history: [],
      current: null,
      previous: null,
    }
  },
  getters,
  mutations,
  actions,
}
