import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

Vue.use(Router);

export default store => {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        component: Home,
        beforeEnter(to, from, next) {
          const logon = store.getters.logon;
          const menu = store.getters.menu;
          const rootPath = /(\/[a-zA-Z]*)/.exec(to.path).pop();

          if (!logon) {
            next("/Login");
          } else {
            if (
              rootPath !== "/Dashboard" &&
              menu.filter(p => p.url === rootPath).length === 0
            ) {
              next("/NotFound");
            }

            next();
          }
        },
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
