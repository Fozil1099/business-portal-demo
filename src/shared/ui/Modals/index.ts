import { defineAsyncComponent } from "vue";

export const Modal = defineAsyncComponent(() => import("./Modal.vue"));
export const CongratulationModal = defineAsyncComponent(
  () => import("./CongratulationModal.vue"),
);
export { vModal, modal } from "./Directives";
