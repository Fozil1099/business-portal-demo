import { defineAsyncComponent } from "vue";

export const LazyScroll = defineAsyncComponent(
  () => import("./LazyScroll.vue")
);
 