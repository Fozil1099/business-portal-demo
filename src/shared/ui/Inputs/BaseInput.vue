<script lang="ts" setup>
import { computed, getCurrentInstance, ref } from "vue";
import { Icon } from "@/shared/ui";
import type { IconName } from "@/shared/ui/Icon/types";


interface Props {
  placeholder?: string;
  disabled?: boolean;
  inputClass?: string;
  icon?: IconName;
  size?: "xs" | "sm" | "md" | "lg";
  id?: string;
  type?: string;
  passwordToggle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  passwordToggle: false,
});

const { uid } = getCurrentInstance()!;
const model = defineModel<string>({
  default: "",
});

const isPasswordVisible = ref(false);

const showPasswordToggle = computed(
  () => props.passwordToggle && props.type === "password",
);

const inputType = computed(() =>
  showPasswordToggle.value && isPasswordVisible.value
    ? "text"
    : props.type || "text",
);

const focusToInput = () => {
  const input = document.getElementById(`input-${uid}`) as HTMLInputElement;
  if (input) {
    input.focus();
  }
};
</script>

<template>
  <div
    class="bg-secondary-200 flex items-center gap-3 overflow-auto custom-scrollbar rounded-lg"
    :class="{
      'opacity-50 cursor-not-allowed': disabled,
      'p-1.5': size === 'xs',
      'py-1.5 px-2': size === 'sm',
      'py-1.5 px-3': size === 'md',
      'py-3 px-4': size === 'lg',
    }"
    @click="focusToInput"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="size-6 text-secondary-300 mr-1"
      :class="{
        'text-success-100': model,
      }"
    />
    <slot v-else />
    <input
      :id="props.id || `input-${uid}`"
      v-model="model"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="
        (inputClass,
        {
          'py-0': size === 'xs',
          'py-1': size === 'sm',
          'py-1.5': size === 'md',
          'py-2': size === 'lg',
        })
      "
      class="border-none w-full bg-transparent focus-visible:outline-none placeholder:text-secondary-300 text-secondary-500 font-normal text-base tracking-[0.1px] min-w-25 disabled:cursor-not-allowed"
    />
    <button
      v-if="showPasswordToggle"
      type="button"
      class="shrink-0 cursor-pointer disabled:cursor-not-allowed"
      :disabled="disabled"
      @click="isPasswordVisible = !isPasswordVisible"
    >
      <Icon
        :name="isPasswordVisible ? 'eye-open' : 'eye'"
        class="size-5 text-success-100"
      />
    </button>
  </div>
</template>
