import type { App } from "vue";
import i18n from "./i18n";
import pinia from "./pinia";
import router from "../router";
import { toastify, toastOptions } from "./toast";

const registerProviders = (app: App): void => {
  app.use(i18n);
  app.use(pinia);
  app.use(router);
  app.use(toastify, toastOptions);
};

export default registerProviders;
