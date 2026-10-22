import { computed, ref } from "vue";
import { changePassword } from "../api/profile";
import type { ChangePasswordPayload } from "../api/types";

const emptyForm = (): ChangePasswordPayload => ({
  old_password: "",
  new_password: "",
  confirm_password: "",
});

export const useChangePassword = () => {
  const form = ref<ChangePasswordPayload>(emptyForm());
  const isSubmitting = ref(false);

  const isMismatch = computed(
    () =>
      !!form.value.confirm_password &&
      form.value.new_password !== form.value.confirm_password,
  );

  const isFormValid = computed(
    () =>
      !!form.value.old_password &&
      !!form.value.new_password &&
      !!form.value.confirm_password &&
      !isMismatch.value,
  );

  const resetForm = () => {
    form.value = emptyForm();
  };

  const handleSubmit = async (onSuccess?: () => void) => {
    if (!isFormValid.value) return;

    isSubmitting.value = true;

    try {
      await changePassword(form.value);
      resetForm();
      onSuccess?.();
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    form,
    isSubmitting,
    isMismatch,
    isFormValid,
    resetForm,
    handleSubmit,
  };
};
