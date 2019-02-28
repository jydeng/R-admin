import * as Types from "./mutation-types";

export default {
  [Types.LOGIN](state, payload) {
    state.user = payload.user;
    state.token = payload.token;
  },
  [Types.LOGOUT](state) {
    state.user = { username: "", role: "" };
    state.menu = [];
    state.token = "";
    state.themeColor = "#27B6AF";
  },
  [Types.SETMENU](state, payload) {
    state.menu = payload;
  },
  [Types.CHANGETHEMECOLOR](state, payload) {
    state.themeColor = payload;
  },
  [Types.ASIDECOLLAPSE](state) {
    state.isCollapse = !state.isCollapse;
  }
};
