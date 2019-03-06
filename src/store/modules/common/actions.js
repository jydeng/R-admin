import * as Types from "./mutation-types";
import storage from "@/shared/storage";

export default {
  login({ commit }, payload) {
    commit(Types.LOGIN, payload);
  },
  logout({ commit }) {
    storage.remove("state");
    commit(Types.LOGOUT);
  },
  setmenu({ commit }, payload) {
    commit(Types.SETMENU, payload);
  },
  changeThemeColor({ commit }, payload) {
    commit(Types.CHANGETHEMECOLOR, payload);
  },
  asideCollapse({ commit }) {
    commit(Types.ASIDECOLLAPSE);
  }
};
