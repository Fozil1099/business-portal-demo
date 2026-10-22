import { defineAsyncComponent } from "vue";

export const NewsList = defineAsyncComponent(() => import("./ui/NewsList.vue"));
export const NewsCard = defineAsyncComponent(() => import("./ui/NewsCard.vue"));
export const NewsDetail = defineAsyncComponent(
  () => import("./ui/NewsDetail.vue"),
);
