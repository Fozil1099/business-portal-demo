import { defineAsyncComponent } from "vue";

export const EmployeesWidget = defineAsyncComponent(
  () => import("./ui/EmployeesInfo.vue"),
);

export default EmployeesWidget;
