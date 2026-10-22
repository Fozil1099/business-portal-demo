import { defineAsyncComponent } from "vue";

export const InfoController = defineAsyncComponent(
  () => import("./InfoController.vue")
);
