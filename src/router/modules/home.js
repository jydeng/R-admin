export default [
  {
    path: "/home",
    component: () => import("@/layout/default"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("@/views/home/dashboard"),
        meta: { index: 1, requiresAuth: true }
      },
      {
        path: "baseTable",
        name: "baseTable",
        component: () => import("@/views/home/baseTable"),
        meta: { index: 2, requiresAuth: true }
      },
      {
        path: "editor",
        name: "editor",
        component: () => import("@/views/home/editor"),
        meta: { index: 3, requiresAuth: true }
      },
      {
        path: "other",
        name: "other",
        component: () => import("@/views/home/other"),
        meta: { index: 4, requiresAuth: true }
      },
      {
        path: "map",
        name: "map",
        component: () => import("@/views/home/map"),
        meta: { index: 6, requiresAuth: true }
      }
    ]
  }
];
