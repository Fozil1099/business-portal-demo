import { defineAsyncComponent } from "vue";

export const AddServiceModal = defineAsyncComponent(
  () => import("./ui/AddServiceModal.vue"),
);

export * from "./api/types";
export { useAddService } from "./model";
