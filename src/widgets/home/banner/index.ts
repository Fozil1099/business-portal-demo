import { defineAsyncComponent } from "vue";

export default defineAsyncComponent(() => import("./ui/Banner.vue"));
