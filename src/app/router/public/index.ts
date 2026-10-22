export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/public/home/Home.vue"),
    meta: {
      loginNotRequired: true,
    },
  },
  {
    path: "/services",
    name: "services",
    component: () => import("@/pages/public/services/Services.vue"),
    meta: {
      loginNotRequired: true,
    },
  },
  {
    path: "/news",
    name: "news",
    component: () => import("@/pages/public/news/News.vue"),
    meta: {
      loginNotRequired: true,
    },
  },
  {
    path: "/news/:id",
    name: "news-details",
    component: () => import("@/pages/public/news/details/Details.vue"),
    meta: {
      loginNotRequired: true,
    },
  },
  {
    path: "/questions",
    name: "questions",
    component: () => import("@/pages/public/questions/Questions.vue"),
    meta: {
      loginNotRequired: true,
    },
  },
];
