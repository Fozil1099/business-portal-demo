<script lang="ts" setup>
import { ref, getCurrentInstance } from "vue";
import { Icon } from "@/shared/ui";
import type { IconName } from "@/shared/ui/Icon/types";

interface Props {
  placeholder?: string;
  disabled?: boolean;
  inputClass?: string;
  icon?: IconName;
}

defineProps<Props>();

const { uid } = getCurrentInstance()!;
const model = defineModel<string[]>({
  default: [],
});
let inputValue = ref<string>("");

const addTag = () => {
  if (inputValue.value.trim() === "") return;
  model.value = [...model.value, inputValue.value];
  inputValue.value = "";
};

const focusToInput = () => {
  const input = document.getElementById(`tag-input-${uid}`) as HTMLInputElement;
  if (input) {
    input.focus();
  }
};

const clearItem = (index: number) => {
  model.value = model.value.filter((_, i) => i !== index);
};
</script>

<template>
  <div
    class="py-2 px-3 bg-primary flex items-center gap-2.5 overflow-auto custom-scrollbar"
    @click="focusToInput"
  >
    <Icon v-if="icon" :name="icon" />
    <slot v-else />
    <div v-if="model?.length" class="flex items-center gap-2">
      <div
        v-for="(item, index) in model"
        class="font-normal text-sm flex items-center gap-1.5 bg-gray px-2.5 py-1.5"
      >
        <span class="text-sm font-normal text-white">{{ item }}</span>
        <div @click="clearItem(index)" class="cursor-pointer">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 10L10 2"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 10L2 2"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <input
      :id="`tag-input-${uid}`"
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClass"
      class="border-none w-full bg-transparent focus-visible:outline-none text-white font-normal text-sm tracking-[0.1px] min-w-[100px] py-1.5"
      @keyup.enter="addTag"
    />
  </div>
</template>
