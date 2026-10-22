<script lang="ts" setup>
withDefaults(
  defineProps<{
    label: string;
    value: string;
    caption?: string;
    variant?: "light" | "primary";
    size?: "md" | "sm";
  }>(),
  { variant: "light", size: "md" },
);
</script>

<template>
  <div
    class="flex flex-col"
    :class="[
      variant === 'primary' ? 'bg__primary__gradient text-white' : 'bg-secondary-200',
      size === 'sm'
        ? 'rounded-xl sm:rounded-2xl px-1 py-1.5 sm:p-4 justify-between'
        : 'rounded-[20px] p-4 sm:p-5 gap-2',
    ]"
  >
    <!-- sm: подпись сверху, число (и caption рядом) прижаты к низу карточки -->
    <p
      class="font-medium uppercase line-clamp-1"
      :class="[
        variant === 'primary' ? 'text-white/80' : 'text-secondary-400',
        size === 'sm'
          ? 'text-[9px] tracking-normal sm:text-xs sm:tracking-[1.5%]'
          : 'text-xs sm:text-sm tracking-[1.5%]',
      ]"
    >
      {{ label }}
    </p>
    <div
      :class="
        size === 'sm'
          ? 'flex flex-col gap-y-0.5 sm:flex-row sm:items-baseline sm:gap-x-3 min-w-0'
          : 'flex flex-col gap-2'
      "
    >
      <p
        class="font-bold leading-[100%] shrink-0"
        :class="size === 'sm' ? 'text-lg sm:text-4xl' : 'text-4xl sm:text-5xl'"
      >
        {{ value }}
      </p>
      <p
        v-if="caption"
        class="font-medium"
        :class="[
          variant === 'primary' ? 'text-white/80' : 'text-secondary-400',
          size === 'sm'
            ? 'text-[9px] leading-tight line-clamp-2 sm:text-xs sm:line-clamp-1'
            : 'text-sm line-clamp-1',
        ]"
      >
        {{ caption }}
      </p>
    </div>
  </div>
</template>
