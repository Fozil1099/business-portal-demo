<script lang="ts" setup>
import { Modal, Btn, BaseInput, Icon } from "@/shared/ui";
import { useEditPhone } from "../model/useEditPhone";
import { vMaska } from "maska/vue";

interface Props {
  initialPhones?: string[];
}

interface Emits {
  (event: "save", phones: string[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { phoneNumbers, addPhoneField, removePhoneField, handleSave } =
  useEditPhone(props, emit);
</script>

<template>
  <Modal
    id="editPhoneModal"
    :title="$t('profile.editPhoneTitle')"
    size="max-w-lg"
    :ok="$t('common.save')"
    :cancel="$t('common.cancel')"
    @ok="handleSave"
  >
    <div class="space-y-4">
      <div
        v-for="(_, index) in phoneNumbers"
        :key="index"
        class="flex items-center gap-3"
      >
        <div class="flex-1">
          <BaseInput
            v-model="phoneNumbers[index]"
            v-maska="'+998 ## ### ## ##'"
            placeholder="+998 XX XXX XX XX"
            icon="phone"
            type="tel"
          />
        </div>
        <Btn
          v-if="index === phoneNumbers.length - 1"
          color="primary"
          @click="addPhoneField"
        >
          <Icon name="plus" class="size-5 text-white" />
        </Btn>
        <Btn v-else color="danger" @click="removePhoneField(index)">
          <Icon name="x" class="size-5 text-white" />
        </Btn>
      </div>
    </div>
  </Modal>
</template>
