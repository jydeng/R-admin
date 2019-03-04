import store from "@/store";
export default [
  {
    path: "/",
    component: () => import("@/pages/home"),
    children: [
      {
        path: "/",
        redirect: "/dashboard",
        meta: { index: 1, auth: true }
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard"),
        meta: { index: 2, auth: true }
      },
      {
        path: "/baseTable",
        name: "baseTable",
        component: () => import("@/views/baseTable"),
        meta: { index: 3, auth: true }
      },
      {
        path: "/editor",
        name: "editor",
        component: () => import("@/views/editor"),
        meta: { index: 4, auth: true }
      },
      {
        path: "/params",
        name: "params",
        component: () => import("@/views/params"),
        meta: { index: 5, auth: true }
      }
    ],
    beforeEnter(to, from, next) {
      if (to.meta.auth) {
        if (store.state.token) {
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
