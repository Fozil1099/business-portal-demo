import { defineAsyncComponent } from "vue";

export const ServiceCard = defineAsyncComponent(
  () => import("./ServiceCard.vue"),
);

export const MainServiceCard = defineAsyncComponent(
  () => import("./MainServiceCard.vue"),
);
