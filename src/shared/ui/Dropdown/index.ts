import { defineAsyncComponent } from "vue";

export const Dropdown = defineAsyncComponent(() => import("./Dropdown.vue"));
export const DropdownItem = defineAsyncComponent(
  () => import("./ui/DropdownItem.vue")
);
