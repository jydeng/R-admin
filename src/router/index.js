import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import store from "@/store";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "/",
          redirect: "/Dashboard",
          meta: { auth: true }
        },
        {
          path: "/Dashboard",
          name: "Dashboard",
          component: () => import("@/views/Dashboard.vue"),
          meta: { auth: true }
        },
        {
          path: "/Table",
          name: "Table",
          component: () => import("@/views/Table.vue"),
          meta: { auth: true }
        },
        {
          path: "/Editor",
          name: "Editor",
          component: () => import("@/views/Editor.vue"),
          meta: { auth: true }
        },
        {
          path: "/UrlInput",
          name: "UrlInput",
          component: () => import("@/views/UrlInput.vue"),
          meta: { auth: true }
        }
      ],
      beforeEnter(to, from, next) {
        if (to.meta.auth) {
          if (store.state.token) {
            next();
          } else {
            next({
              path: "/Login",
              query: { redirect: to.fullPath }
            });
          }
        } else {
          next();
        }
      }
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});
