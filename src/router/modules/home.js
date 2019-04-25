import store from "@/store";
export default [
  {
    path: "/home",
    component: () => import("@/pages/home"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("@/views/dashboard"),
        meta: { index: 1, requiresAuth: true }
      },
      {
        path: "baseTable",
        name: "baseTable",
        component: () => import("@/views/baseTable"),
        meta: { index: 2, requiresAuth: true }
      },
      {
        path: "editor",
        name: "editor",
        component: () => import("@/views/editor"),
        meta: { index: 3, requiresAuth: true }
      },
      {
        path: "other",
        name: "other",
        component: () => import("@/views/other"),
        meta: { index: 4, requiresAuth: true }
      }
    ],
    beforeEnter(to, from, next) {
      // 是否登录校验
      if (to.meta.requiresAuth) {
        if (store.state.user.token) {
          next();
        } else {
          next({
            path: "/login",
            query: { redirect: to.fullPath }
          });
        }
      } else {
        next();
      }
    }
  }
];
