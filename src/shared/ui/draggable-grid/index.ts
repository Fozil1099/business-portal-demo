import { defineAsyncComponent } from "vue";

export const DraggableGrid = defineAsyncComponent(
  () => import("./DraggableGrid.vue")
);
