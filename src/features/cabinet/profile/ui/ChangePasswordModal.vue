<script lang="ts" setup>
import { Modal, BaseInput, modal } from "@/shared/ui";
import { useChangePassword } from "../model/useChangePassword";

const { form, isSubmitting, isMismatch, isFormValid, resetForm, handleSubmit } =
  useChangePassword();

const fields = [
  { key: "old_password", label: "profile.oldPasswordLabel" },
  { key: "new_password", label: "profile.newPasswordLabel" },
  { key: "confirm_password", label: "profile.confirmPasswordLabel" },
] as const;

const onSave = async () => {
  await handleSubmit(() => modal("change-password-modal").hide());
};
</script>

<template>
  <Modal
    id="change-password-modal"
    :title="$t('profile.changePasswordTitle')"
    size="max-w-lg"
    :ok="$t('common.save')"
    :cancel="$t('common.cancel')"
    :loader="isSubmitting"
    :ok-disabled="!isFormValid || isSubmitting"
    @ok="onSave"
    @hide="resetForm"
  >
    <div class="space-y-5">
      <div v-for="field in fields" :key="field.key" class="space-y-2">
        <p
          class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500"
        >
          {{ $t(field.label) }}
        </p>
        <BaseInput
          v-model="form[field.key]"
          icon="password"
          type="password"
          password-toggle
          :placeholder="$t(field.label)"
          :disabled="isSubmitting"
        />
      </div>
      <p v-if="isMismatch" class="text-sm font-normal text-danger-100">
        {{ $t("profile.passwordsMismatch") }}
      </p>
    </div>
  </Modal>
</template>
