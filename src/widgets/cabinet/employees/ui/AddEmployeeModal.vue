<script lang="ts" setup>
import { Modal, BaseInput } from "@/shared/ui";
import {
  useEmployeeModal,
  MIN_PASSWORD_LENGTH,
} from "@/features/cabinet/employees";
import type { Employee } from "@/features/cabinet/employees";

const props = defineProps<{
  employee?: Employee;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const {
  form,
  isEdit,
  isSubmitting,
  isFormValid,
  isPasswordTooShort,
  handleSave,
  resetForm,
} = useEmployeeModal(props);

const nameFields = [
  { key: "first_name", label: "employees.firstNameLabel", placeholder: "employees.firstNamePlaceholder" },
  { key: "middle_name", label: "employees.middleNameLabel", placeholder: "employees.middleNamePlaceholder" },
  { key: "last_name", label: "employees.lastNameLabel", placeholder: "employees.lastNamePlaceholder" },
  { key: "position", label: "employees.positionLabel", placeholder: "employees.positionLabel" },
] as const;

const saveData = async () => {
  await handleSave(() => emit("update"));
};
</script>

<template>
  <Modal
    id="add-employee-modal"
    :title="isEdit ? $t('employees.editTitle') : $t('employees.addTitle')"
    size="max-w-lg"
    :ok="$t('common.save')"
    :cancel="$t('common.cancel')"
    :loader="isSubmitting"
    :ok-disabled="!isFormValid || isSubmitting"
    @ok="saveData"
    @hide="resetForm"
  >
    <div class="space-y-5">
      <div v-for="field in nameFields" :key="field.key" class="space-y-2">
        <p class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500">
          {{ $t(field.label) }}
        </p>
        <BaseInput
          v-model="form[field.key]"
          icon="profile"
          :placeholder="$t(field.placeholder)"
          :disabled="isSubmitting"
        />
      </div>

      <template v-if="!isEdit">
        <div class="space-y-2">
          <p class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500">
            {{ $t('employees.loginLabel') }}
          </p>
          <BaseInput
            v-model="form.username"
            icon="profile"
            :placeholder="$t('employees.loginLabel')"
            :disabled="isSubmitting"
          />
        </div>
        <div class="space-y-2">
          <p class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500">
            {{ $t('employees.passwordLabel') }}
          </p>
          <BaseInput
            v-model="form.password"
            icon="password"
            type="password"
            password-toggle
            :placeholder="$t('employees.passwordLabel')"
            :disabled="isSubmitting"
          />
          <p
            class="text-sm font-normal"
            :class="isPasswordTooShort ? 'text-danger-100' : 'text-secondary-400'"
          >
            {{ $t('employees.passwordHint', { min: MIN_PASSWORD_LENGTH }) }}
          </p>
        </div>
      </template>
    </div>
  </Modal>
</template>
