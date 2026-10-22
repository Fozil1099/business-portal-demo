import { defineAsyncComponent } from "vue";

export default {
  EmptyLayout: defineAsyncComponent(() => import("./EmptyLayout.vue")),
  MainLayout: defineAsyncComponent(() => import("./MainLayout.vue")),
  CabinetLayout: defineAsyncComponent(() => import("./CabinetLayout.vue")),
};
