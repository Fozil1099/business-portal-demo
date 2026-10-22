import { defineAsyncComponent } from "vue";

export const RichText = defineAsyncComponent(() => import("./RichText.vue"));
