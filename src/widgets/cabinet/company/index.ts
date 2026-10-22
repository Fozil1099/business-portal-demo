import { defineAsyncComponent } from "vue";

export const CompanyDetail = defineAsyncComponent(
  () => import("./ui/CompanyDetail.vue"),
);
export const Transport = defineAsyncComponent(
  () => import("./ui/Transport.vue"),
);
export const Certificate = defineAsyncComponent(
  () => import("./ui/Certificate.vue"),
);
export const CompanyWidget = defineAsyncComponent(
  () => import("./ui/CompanyWidget.vue"),
);
