import store from "@/store";
export default [
  {
    path: "/",
    component: () => import("@/pages/home"),
    children: [
      {
        path: "/",
        redirect: "/dashboard",
        meta: { auth: true }
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard"),
        meta: { auth: true }
      },
      {
        path: "/baseTable",
        name: "baseTable",
        component: () => import("@/views/baseTable"),
        meta: { auth: true }
      },
      {
        path: "/editor",
        name: "editor",
        component: () => import("@/views/editor"),
        meta: { auth: true }
      },
      {
        path: "/urlInput",
        name: "urlInput",
        component: () => import("@/views/urlInput"),
        meta: { auth: true }
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
