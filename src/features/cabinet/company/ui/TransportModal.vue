<script lang="ts" setup>
import { Modal, BaseInput } from "@/shared/ui";
import { useTransportModal } from "../model/useTransportModal";
import { vMaska } from "maska/vue";
import type { CompanyCar } from "../api/types";

const props = defineProps<{
  car?: CompanyCar;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const { form, isSubmitting, handleSave, isFormValid } = useTransportModal(props);

const saveData = async () => {
  await handleSave(() => emit("update"));
};
</script>

<template>
  <Modal
    id="transport-modal"
    :title="$t('transport.title')"
    size="max-w-lg"
    :ok="$t('common.save')"
    :cancel="$t('common.cancel')"
    :loading="isSubmitting"
    :ok-disabled="!isFormValid"
    @ok="saveData"
  >
    <div class="space-y-5">
      <div class="space-y-2">
        <p
          class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500"
        >
          {{ $t('transport.carLabel') }}
        </p>
        <BaseInput v-model="form.name" icon="car" :placeholder="$t('transport.carPlaceholder')" />
      </div>
      <div class="space-y-2">
        <p
          class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500"
        >
          {{ $t('transport.numberLabel') }}
        </p>
        <BaseInput
          v-maska="'## ###@@@'"
          v-model="form.number"
          icon="car"
          :placeholder="$t('transport.numberPlaceholder')"
        />
      </div>
      <div class="space-y-2">
        <p
          class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500"
        >
          {{ $t('transport.passportLabel') }}
        </p>
        <BaseInput
          v-model="form.serial_number"
          icon="car"
          :placeholder="$t('transport.passportPlaceholder')"
        />
      </div>
    </div>
  </Modal>
</template>
