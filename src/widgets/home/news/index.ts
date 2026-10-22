import { defineAsyncComponent } from "vue";

export const NewsSlider = defineAsyncComponent(
  () => import("./ui/NewsSlider.vue"),
);

export default defineAsyncComponent(() => import("./ui/News.vue"));
