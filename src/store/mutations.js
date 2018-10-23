import * as Types from "./mutation-types";

export default {
  [Types.LOGIN](state, payload) {
    state.user = payload.user;
  },
  [Types.LOGOUT](state) {
    state.user = { username: "", role: "" };
    state.menu = [];
  },
  [Types.SETMENU](state, payload) {
    state.menu = payload;
  },
  [Types.CHANGETHEMECOLOR](state, payload) {
    state.themeColor = payload;
  }
};
