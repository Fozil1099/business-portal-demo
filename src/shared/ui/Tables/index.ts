import { defineAsyncComponent } from "vue";

export const BasicTable = defineAsyncComponent(
  () => import("./BasicTable.vue")
);
