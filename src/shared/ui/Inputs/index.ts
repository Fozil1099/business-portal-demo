import { defineAsyncComponent } from "vue";

export const TagInput = defineAsyncComponent(() => import("./TagInput.vue"));
export const BaseInput = defineAsyncComponent(() => import("./BaseInput.vue"));
export const DefaultInput = defineAsyncComponent(
  () => import("./DefaultInput.vue")
);
export const AvatarInput = defineAsyncComponent(
  () => import("./AvatarInput.vue")
);
export const ImageInput = defineAsyncComponent(
  () => import("./ImageInput.vue")
);
export const LocationInput = defineAsyncComponent(
  () => import("./LocationInput.vue")
);
