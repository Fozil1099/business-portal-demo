import { defineAsyncComponent } from "vue";

export const ServicesWidget = defineAsyncComponent(
  () => import("./ui/ServicesWidget.vue"),
);

export const ServiceTypesWidget = defineAsyncComponent(
  () => import("./ui/ServiceTypesWidget.vue"),
);
 