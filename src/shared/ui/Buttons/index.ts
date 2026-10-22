import { defineAsyncComponent } from "vue";

export const Btn = defineAsyncComponent(() => import("./Button.vue"));
