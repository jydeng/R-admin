import * as Types from "./mutation-types";

export default {
  login({ commit }, payload) {
    commit(Types.LOGIN, payload);
  },
  logout({ commit }) {
    commit(Types.LOGOUT);
  },
  setmenu({ commit }, payload) {
    commit(Types.SETMENU, payload);
  },
  changeThemeColor({ commit }, payload) {
    commit(Types.CHANGETHEMECOLOR, payload);
  }
};
