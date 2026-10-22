import { defineAsyncComponent } from "vue";

export const ImagePreview = defineAsyncComponent(
  () => import("./ImagePreview.vue"),
);
