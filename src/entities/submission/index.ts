import { defineAsyncComponent } from "vue";

export const SubmissionCard = defineAsyncComponent(
  () => import("./ui/SubmissionCard.vue"),
);

export const SubmissionPhotoThumb = defineAsyncComponent(
  () => import("./ui/SubmissionPhotoThumb.vue"),
);

export * from "./model/types";
export * from "./model/usePhotoUrl";
export * from "./lib/status";
