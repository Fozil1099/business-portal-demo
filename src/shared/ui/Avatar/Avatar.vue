<script lang="ts" setup>
import { computed } from "vue";
import { Icon } from "@/shared/ui";

interface Props {
  name?: string | null;
  src?: string | null;
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

const initials = computed(() =>
  (props.name ?? "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase(),
);
</script>

<template>
  <span
    class="avatar inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg__primary__gradient text-white font-semibold select-none"
    :class="{
      'size-8 text-xs': size === 'sm',
      'size-11 text-base': size === 'md',
      'size-14 text-lg': size === 'lg',
    }"
  >
    <img
      v-if="src"
      :src="src"
      :alt="name ?? ''"
      class="size-full object-cover"
    />
    <template v-else-if="initials">{{ initials }}</template>
    <Icon v-else name="profile" class="size-1/2" />
  </span>
</template>
