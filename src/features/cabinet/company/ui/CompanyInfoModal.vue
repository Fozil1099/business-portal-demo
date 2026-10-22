<script lang="ts" setup>
import { Modal, BaseInput, AvatarInput, Btn, Icon, modal } from "@/shared/ui";
import type { CompanyDetail } from "../api/types";
import { useCompanyInfoModal } from "../model/useCompanyInfoModal";
import { formInputs } from "../model/constants";
import { vMaska } from "maska/vue";

const props = defineProps<{
  company?: CompanyDetail;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const {
  form,
  isSubmitting,
  getReadonlyValue,
  resetForm,
  handleSave,
  addPhoneField,
  removePhoneField,
} = useCompanyInfoModal(props);

const saveData = async () => {
  await handleSave(() => {
    modal("company-info-modal").hide();
    emit("update");
  });
};
</script>

<template>
  <Modal
    id="company-info-modal"
    :title="$t('company.title')"
    size="max-w-5xl"
    :ok="$t('common.save')"
    :cancel="$t('common.cancel')"
    :loader="isSubmitting"
    :ok-disabled="isSubmitting"
    @ok="saveData"
    @hide="resetForm"
  >
    <div class="grid grid-cols-2 gap-5">
      <AvatarInput
        v-model="form.logo"
        :hint="$t('company.logoHint')"
        :button-text="$t('company.logoButton')"
        class="row-span-2"
      />
      <div
        v-for="input in formInputs"
        :key="input.key"
        class="space-y-2"
        :class="{ 'col-span-2': input.cols === 2 }"
      >
        <p
          class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500"
        >
          {{ $t(input.labelKey) }}
        </p>
        <BaseInput
          v-if="input.editable"
          v-model="form[input.editable]"
          :icon="input.icon"
          :placeholder="$t(input.placeholderKey)"
          :disabled="isSubmitting"
        />
        <BaseInput
          v-else
          :model-value="getReadonlyValue(input.key)"
          :icon="input.icon"
          :placeholder="$t(input.placeholderKey)"
          disabled
        />
      </div>

      <div class="col-span-2 space-y-2">
        <p
          class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500"
        >
          {{ $t('company.phoneLabel') }}
        </p>

        <div
          v-for="(_, index) in form.phone_numbers"
          :key="index"
          class="flex items-center gap-3"
        >
          <div class="flex-1">
            <BaseInput
              v-model="form.phone_numbers[index]"
              v-maska="'+998 ## ### ## ##'"
              placeholder="+998 XX XXX XX XX"
              icon="phone"
              type="tel"
              :disabled="isSubmitting"
            />
          </div>
          <Btn
            v-if="index === form.phone_numbers.length - 1"
            color="primary"
            type="button"
            @click="addPhoneField"
          >
            <Icon name="plus" class="size-5 text-white" />
          </Btn>
          <Btn
            v-else
            color="danger"
            type="button"
            @click="removePhoneField(index)"
          >
            <Icon name="x" class="size-5 text-white" />
          </Btn>
        </div>
      </div>
    </div>
  </Modal>
</template>
