import { defineAsyncComponent } from "vue";

export const Checkbox = defineAsyncComponent(() => import("./Checkbox.vue"));
export const Switch = defineAsyncComponent(() => import("./Switch.vue"));
