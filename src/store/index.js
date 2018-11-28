import Vue from "vue";
import Vuex from "vuex";

import state from "./states";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({ state, getters, actions, mutations });
};
