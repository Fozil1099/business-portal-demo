import { defineAsyncComponent } from "vue";

export const Loader = defineAsyncComponent(() => import("./Loader.vue"));
export const LoaderAnimation = defineAsyncComponent(() => import("./LoaderAnimation.vue"));
