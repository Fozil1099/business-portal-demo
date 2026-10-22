import { isUserLoggedIn } from "@/shared/utils/auth";
import { type Router } from "vue-router";
// import { check } from "./auth";

export const checkRouterPermissions = (router: Router) => {
  router.beforeEach(async (to: any, _, next) => {
    const isLoggedIn = isUserLoggedIn();

    if (to.meta.loginNotRequired) return next();

    if (!isLoggedIn) {
      return next({ name: "home" });
    }

    // if (to.meta.permissions && !check(to?.meta?.permissions)) {
    //   return next({ name: 'error-404' })
    // }
    next();
  });
};
