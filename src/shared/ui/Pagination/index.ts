import { defineAsyncComponent } from "vue";

export const Pagination = defineAsyncComponent(
  () => import("./Pagination.vue")
);
