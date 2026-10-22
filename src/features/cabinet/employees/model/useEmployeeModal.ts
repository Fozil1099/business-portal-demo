import { ref, computed, watch } from "vue";
import { createEmployee, updateEmployee } from "../api/employees";
import type { Employee } from "../api/types";
import { modal } from "@/shared/ui";

export const MIN_PASSWORD_LENGTH = 8;

interface EmployeeForm {
  first_name: string;
  middle_name: string;
  last_name: string;
  position: string;
  username: string;
  password: string;
}

const toForm = (employee?: Employee): EmployeeForm => ({
  first_name: employee?.first_name ?? "",
  middle_name: employee?.middle_name ?? "",
  last_name: employee?.last_name ?? "",
  position: employee?.position ?? "",
  username: "",
  password: "",
});

export const useEmployeeModal = (props: { employee?: Employee }) => {
  const isSubmitting = ref(false);
  const form = ref<EmployeeForm>(toForm(props.employee));

  const isEdit = computed(() => !!props.employee);

  const resetForm = () => {
    form.value = toForm(props.employee);
  };

  watch(() => props.employee, resetForm);

  const isPasswordTooShort = computed(
    () =>
      !!form.value.password &&
      form.value.password.length < MIN_PASSWORD_LENGTH,
  );

  const isFormValid = computed(() => {
    const hasName =
      form.value.first_name.trim() !== "" &&
      form.value.last_name.trim() !== "";

    if (isEdit.value) return hasName;

    return (
      hasName &&
      form.value.username.trim() !== "" &&
      form.value.password !== "" &&
      !isPasswordTooShort.value
    );
  });

  const handleSave = async (onSuccess?: () => void) => {
    if (!isFormValid.value) return;

    isSubmitting.value = true;

    const profile = {
      first_name: form.value.first_name.trim(),
      middle_name: form.value.middle_name.trim(),
      last_name: form.value.last_name.trim(),
      position: form.value.position.trim(),
    };

    try {
      if (props.employee) {
        await updateEmployee(props.employee.uuid, profile);
      } else {
        await createEmployee({
          ...profile,
          username: form.value.username.trim(),
          password: form.value.password,
        });
      }
      modal("add-employee-modal").hide();
      resetForm();
      onSuccess?.();
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    form,
    isEdit,
    isSubmitting,
    isFormValid,
    isPasswordTooShort,
    handleSave,
    resetForm,
  };
};
