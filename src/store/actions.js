import * as Types from "./mutation-types";
import webStorageHelper from "@/helper/webStorageHelper";

export default {
  login({ commit }, payload) {
    commit(Types.LOGIN, payload);
  },
  logout({ commit }) {
    webStorageHelper.remove("state");
    commit(Types.LOGOUT);
  },
  setmenu({ commit }, payload) {
    commit(Types.SETMENU, payload);
  },
  changeThemeColor({ commit }, payload) {
    commit(Types.CHANGETHEMECOLOR, payload);
  }
};
