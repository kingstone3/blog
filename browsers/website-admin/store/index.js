import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import actions from './actions';
import mutations from './mutations';

import wsModule from './ws';


Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {

    }
  },
  getters,
  mutations,
  actions,
  modules: {
    ws: wsModule,
  },
})
