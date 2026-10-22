<script lang="ts" setup>
import { Btn, Icon } from "@/shared/ui";

interface Props {
  title: string;
  value: string | number;
  label: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (event: "open"): void;
}>();
</script>

<template>
  <div
    class="bg-secondary-200 rounded-[20px] p-5 space-y-10 flex flex-col justify-between"
  >
    <div class="flex items-start justify-between gap-1">
      <h3 class="text-xl font-bold leading-6 tracking-[1.5%]">
        {{ title }}
      </h3>
      <img src="@/shared/assets/images/Tree.svg" alt="" class="size-8" />
    </div>
    <div class="flex items-end justify-between">
      <div>
        <p
          class="text-sm font-medium leading-4 tracking-[1.5%] text-secondary-400"
        >
          {{ label }}
        </p>
        <h2
          class="text__primary__gradient text-[32px] font-bold leading-9 tracking-[1.5%]"
        >
          {{ value }}
        </h2>
      </div>
      <Btn size="sm" @click="emit('open')"
        ><Icon name="arrows" class="size-6 rotate-180"
      /></Btn>
    </div>
  </div>
</template>
