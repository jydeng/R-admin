import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

Vue.use(Router);

const router = new Router({
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
          component: resolve => require(["@/views/Dashboard.vue"], resolve)
        },
        {
          path: "Table",
          name: "Table",
          component: resolve => require(["@/views/Table.vue"], resolve)
        },
        {
          path: "Editor",
          name: "Editor",
          component: resolve => require(["@/views/Editor.vue"], resolve)
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

export default router;
