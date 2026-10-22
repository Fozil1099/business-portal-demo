<script lang="ts" setup>
import { Icon } from "@/shared/ui";
import type { IconName } from "@/shared/ui/Icon/types";

interface Props {
  title: string;
  icon?: IconName;
  variant?: "default" | "danger";
}

withDefaults(defineProps<Props>(), {
  variant: "default",
});

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button
    type="button"
    class="dropdown__item group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm font-medium text-secondary-500 cursor-pointer transition-colors"
    :class="
      variant === 'danger'
        ? 'hover:bg-danger-100/10 hover:text-danger-100'
        : 'hover:bg-secondary-200'
    "
    @click="emit('click')"
  >
    <span
      v-if="icon"
      class="flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors"
      :class="
        variant === 'danger'
          ? 'bg-danger-100/10 text-danger-100'
          : 'bg-secondary-200 text-secondary-400 group-hover:bg-white group-hover:text-success-100'
      "
    >
      <Icon :name="icon" class="size-[18px]" />
    </span>
    <span class="flex-1">{{ title }}</span>
    <slot />
  </button>
</template>
