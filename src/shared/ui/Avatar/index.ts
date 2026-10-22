import { defineAsyncComponent } from "vue";

export const Avatar = defineAsyncComponent(() => import("./Avatar.vue"));
