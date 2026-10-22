import { defineAsyncComponent } from "vue";

export default defineAsyncComponent(() => import("./ui/Header.vue"));
