export default [
  {
    path: "/canvas&svg",
    component: () => import("@/layout/default"),
    children: [
      {
        path: "hello",
        name: "hello",
        component: () => import("@/views/canvas&svg/hello"),
        meta: { index: 6, requiresAuth: true }
      },
      {
        path: "text",
        name: "text",
        component: () => import("@/views/canvas&svg/text"),
        meta: { index: 7, requiresAuth: true }
      }
    ]
  }
];
