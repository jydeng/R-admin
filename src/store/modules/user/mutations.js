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
  },
  [Types.SETMENU](state, payload) {
    state.menu = payload;
  }
};
