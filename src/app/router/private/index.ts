export default [
  {
    path: "/cabinet/services",
    name: "cabinet-services",
    component: () => import("@/pages/cabinet/services/ServiceTypes.vue"),
    meta: {
      layout: "cabinet",
    },
  },
  {
    path: "/cabinet/services/:id",
    name: "cabinet-services-details",
    component: () => import("@/pages/cabinet/services/details/Services.vue"),
    meta: {
      layout: "cabinet",
    },
  },
  {
    path: "/cabinet/profile",
    name: "cabinet-profile",
    component: () => import("@/pages/cabinet/profile/Profile.vue"),
    meta: {
      layout: "cabinet",
    },
  },
  {
    path: "/cabinet/company",
    name: "cabinet-company",
    component: () => import("@/pages/cabinet/company/Company.vue"),
    meta: {
      layout: "cabinet",
    },
  },
  {
    path: "/cabinet/employees",
    name: "cabinet-employees",
    component: () => import("@/pages/cabinet/employees/Employees.vue"),
    meta: {
      layout: "cabinet",
    },
  },
];
