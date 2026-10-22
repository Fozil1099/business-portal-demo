import { defineAsyncComponent } from "vue";

export const StatCard = defineAsyncComponent(() => import("./StatCard.vue"));
