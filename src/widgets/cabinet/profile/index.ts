import { defineAsyncComponent } from "vue";

export const ProfileWidget = defineAsyncComponent(
  () => import("./ui/ProfileWidget.vue"),
);

export * from "./model/useProfileWidget";
