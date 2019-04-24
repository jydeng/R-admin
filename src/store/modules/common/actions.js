import * as Types from "./mutation-types";

export default {
  changeThemeColor({ commit }, payload) {
    commit(Types.CHANGETHEMECOLOR, payload);
  },
  asideCollapse({ commit }) {
    commit(Types.ASIDECOLLAPSE);
  }
};
