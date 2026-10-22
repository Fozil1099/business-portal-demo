import { defineAsyncComponent } from "vue";

export * from "./api/types";
export * from "./model";

export const EditPhoneModal = defineAsyncComponent(() => import("./ui/EditPhoneModal.vue"));
export const ChangePasswordModal = defineAsyncComponent(
  () => import("./ui/ChangePasswordModal.vue"),
);
