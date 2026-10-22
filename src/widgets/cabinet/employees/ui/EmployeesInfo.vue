<script lang="ts" setup>
import { ref, computed } from "vue";
import {
  Btn,
  Icon,
  InfoController,
  LazyScroll,
  Loader,
  modal,
} from "@/shared/ui";
import { useEmployees } from "@/features/cabinet/employees";
import type { Employee } from "@/features/cabinet/employees";
import AddEmployeeModal from "./AddEmployeeModal.vue";
import DeleteEmployeeModal from "./DeleteEmployeeModal.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const employeeData = computed(() => [
  {
    label: t("employees.fullNameLabel"),
    key: "full_name",
  },
  {
    label: t("employees.positionLabel"),
    key: "position",
  },
  {
    label: t("employees.loginLabel"),
    key: "login",
  },
]);

const {
  employees,
  isLoading,
  isInitialLoading,
  fetchEmployees,
  loadMore,
  getValue,
  handleConfirmDelete,
  handleDelete,
} = useEmployees();

const reload = () => fetchEmployees();

const selectedEmployee = ref<Employee | undefined>(undefined);

const openAddModal = () => {
  selectedEmployee.value = undefined;
  modal("add-employee-modal").show();
};

const openEditModal = (employee: Employee) => {
  selectedEmployee.value = employee;
  modal("add-employee-modal").show();
};

const onDeleted = () => {
  handleDelete(reload);
};
</script>

<template>
  <div class="card space-y-5">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold leading-6 tracking-[1.5%]">
        {{ $t('employees.listTitle') }}
      </h3>
      <Btn color="icon" @click="openAddModal">
        <Icon name="plus" class="size-5 text-success-100" />
      </Btn>
    </div>
    <Loader
      :is-loading="isInitialLoading"
      :data="employees.results"
    >
      <LazyScroll
        :pagination="employees.pagination"
        :is-loading="isLoading"
        :on-load-more="loadMore"
      >
        <template
          v-for="(employee, employeeIndex) in employees.results"
          :key="employee.uuid"
        >
          <div class="grid grid-cols-12 gap-5">
            <div class="grid grid-cols-3 gap-5 col-span-11">
              <InfoController
                v-for="item in employeeData"
                :key="item.key"
                :item="{
                  label: item.label,
                  key: item.key,
                  value: getValue(item.key, employee),
                }"
                refresh-hidden
              />
            </div>
            <div class="col-span-1 flex items-start gap-5 py-3">
              <Btn color="icon" @click="openEditModal(employee)">
                <Icon name="edit" class="size-5 text-warning-100" />
              </Btn>
              <Btn color="icon" @click="handleConfirmDelete(employee)">
                <Icon name="delete" class="size-5 text-danger-100" />
              </Btn>
            </div>
          </div>
          <div
            class="h-px w-full bg-secondary-300 my-5"
            v-if="employeeIndex !== employees.results.length - 1"
          ></div>
        </template>
      </LazyScroll>
    </Loader>

    <AddEmployeeModal :employee="selectedEmployee" @update="reload" />
    <DeleteEmployeeModal @delete="onDeleted" />
  </div>
</template>
