import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
// import { isUserLoggedIn } from "@/shared/utils/auth";
import { checkRouterPermissions } from "../../shared/utils/routerPermissions";
import publicRoutes from "./public/index";
import privateRoutes from "./private/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/error-404",
    name: "error-404",
    meta: {
      layout: "empty",
      loginNotRequired: true,
    },
    component: () => import("@/pages/public/page404/Page404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: () => ({
      name: "error-404",
      loginNotRequired: true,
    }),
  },

  ...publicRoutes,
  ...privateRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

checkRouterPermissions(router);

export default router;
