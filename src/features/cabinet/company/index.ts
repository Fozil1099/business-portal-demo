import { defineAsyncComponent } from "vue";

export * from "./api/types";
export * from "./model";

export const CompanyInfoModal = defineAsyncComponent(
  () => import("./ui/CompanyInfoModal.vue"),
);

export const TransportModal = defineAsyncComponent(
  () => import("./ui/TransportModal.vue"),
);

export const TransportDeleteModal = defineAsyncComponent(
  () => import("./ui/TransportDeleteModal.vue"),
);
