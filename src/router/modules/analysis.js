export default [
  {
    path: "/analysis",
    component: () => import("@/layout/default"),
    children: [
      {
        path: "crowd",
        name: "crowd",
        component: () => import("@/views/analysis/crowd"),
        meta: { index: 5, requiresAuth: true }
      }
    ]
  }
];
