import { defineAsyncComponent } from "vue";

export const RadioButton = defineAsyncComponent(
  () => import("./RadioButton.vue")
);
export const RadioForm = defineAsyncComponent(() => import("./RadioForm.vue"));
export const RadioLabel = defineAsyncComponent(
  () => import("./RadioLabel.vue")
);
