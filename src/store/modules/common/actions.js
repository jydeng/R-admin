import * as Types from "./mutation-types";
import screenfull from "screenfull";

export default {
  changeThemeColor({ commit }, payload) {
    commit(Types.CHANGETHEMECOLOR, payload);
  },
  asideCollapse({ commit }) {
    commit(Types.ASIDECOLLAPSE);
  },
  toggleFullScreen({ commit }) {
    if (screenfull.isFullscreen) {
      screenfull.exit();
    } else {
      screenfull.request();
    }
    commit(Types.TOGGLEFULLSCREEN);
  }
};
