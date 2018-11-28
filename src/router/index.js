import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

Vue.use(Router);

export default () => {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        component: Home,
        children: [
          {
            path: "/",
            redirect: "/Dashboard"
          },
          {
            path: "/Dashboard",
            name: "Dashboard",
            component: () => import("@/views/Dashboard.vue")
          },
          {
            path: "Table",
            name: "Table",
            component: () => import("@/views/Table.vue")
          },
          {
            path: "Editor",
            name: "Editor",
            component: () => import("@/views/Editor.vue")
          }
        ]
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
};
