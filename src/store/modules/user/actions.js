import * as Types from "./mutation-types";
import storage from "@/shared/storage";
import router from "@/router";

export default {
  login({ commit }, payload) {
    commit(Types.LOGIN, payload);
    if (payload.redirect) {
      router.push(payload.redirect);
    }
  },
  logout({ commit }) {
    commit(Types.LOGOUT);
    storage.remove("state");
    router.push("/login");
  },
  setmenu({ commit }, payload) {
    commit(Types.SETMENU, payload);
  }
};
