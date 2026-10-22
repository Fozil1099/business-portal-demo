<script lang="ts" setup>
import { Modal } from "@/shared/ui";

const emit = defineEmits<{
  (e: "delete"): void;
}>();
</script>

<template>
  <Modal
    id="delete-employee-modal"
    :title="$t('employees.deleteTitle')"
    size="max-w-md"
    :ok="$t('common.confirm')"
    :cancel="$t('common.cancel')"
    @ok="emit('delete')"
  >
    <p class="text-base font-normal leading-6 text-secondary-700">
      {{ $t('employees.deleteConfirm') }}
    </p>
  </Modal>
</template>
