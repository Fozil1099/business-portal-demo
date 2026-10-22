<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  color?:
    | "primary"
    | "danger"
    | "yellow"
    | "gray"
    | "gray-light"
    | "underline"
    | "outline"
    | "blue"
    | "icon";
  size?: "sm" | "md";
  block?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  color: "primary",
  size: "md",
});
</script>

<template>
  <button
    :disabled="disabled"
    :class="{
      'hover:opacity-90 active:opacity-70 bg__primary__gradient text-white':
        color == 'primary',
      'hover:opacity-90 active:opacity-70 bg__danger__gradient text-white':
        color == 'danger',
      'hover:opacity-90 active:opacity-70 bg__yellow__gradient text-white':
        color == 'yellow',
      'hover:opacity-90 active:opacity-70 bg__gray__gradient text-white':
        color == 'gray',
      'hover:opacity-90 active:opacity-70 bg-[#E6E6E6] text-[#999999]':
        color == 'gray-light',
      'underline text__primary__gradient underlined': color == 'underline',
      'border border-secondary-400 text-secondary-400': color == 'outline',
      'hover:opacity-90 active:opacity-70 bg__blue__gradient text-white': color == 'blue',
      'bg-transparent p-0!': color == 'icon',
      sm: size == 'sm',
      md: size == 'md',
      'w-full': block,
    }"
    class="btn flex items-center justify-center gap-2 rounded-lg cursor-pointer"
  >
    <slot />
  </button>
</template>

<style scoped>
@reference "tailwindcss";

.btn:disabled {
  background: #6d6e79 !important;
  cursor: not-allowed;
}
.sm {
  @apply p-1.5 text-base font-medium;
}
.md {
  @apply py-2 px-3 text-base font-medium;
}
</style>
