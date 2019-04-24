import * as Types from "./mutation-types";

export default {
  [Types.CHANGETHEMECOLOR](state, payload) {
    state.themeColor = payload;
  },
  [Types.ASIDECOLLAPSE](state) {
    state.isCollapse = !state.isCollapse;
  }
};
