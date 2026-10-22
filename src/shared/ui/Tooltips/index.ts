import { defineAsyncComponent } from "vue";

export const Tooltip = defineAsyncComponent(() => import("./Tooltip.vue"));
