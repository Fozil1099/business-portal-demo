import { defineAsyncComponent } from "vue";

export const ServicesList = defineAsyncComponent(
  () => import("./ui/ServicesList.vue"),
);

export const CardDetailModal = defineAsyncComponent(
  () => import("./ui/CardDetailModal.vue"),
);
