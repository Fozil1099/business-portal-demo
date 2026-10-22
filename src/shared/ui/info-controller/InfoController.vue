<script lang="ts" setup>
import { Btn, Icon } from "@/shared/ui";

const emit = defineEmits<{
  (event: "refresh"): void;
  (event: "edit"): void;
}>();
defineProps<{
  item: {
    label: string;
    key: string;
    value: string | string[] | number;
  };
  phoneEdit?: boolean;
  refreshHidden?: boolean;
}>();
</script>

<template>
  <div class="space-y-2">
    <p
      class="text-base font-medium leading-5 tracking-[1.5%] text-secondary-400"
    >
      {{ item.label }}
    </p>
    <div
      v-if="['phone', 'phone_numbers'].includes(item.key)"
      class="flex items-center gap-3"
    >
      <span
        v-for="(phone, index) in item.value"
        :key="phone"
        class="text-base font-medium leading-5 tracking-[1.5%] flex items-center gap-3"
      >
        {{ phone }}
        <div
          v-if="index !== (item.value as string[]).length - 1"
          class="w-px h-5 bg-secondary-300"
        ></div>
      </span>
      <Btn v-if="phoneEdit" color="icon" @click="emit('edit')">
        <Icon name="edit" class="size-5 text-warning-100" />
      </Btn>
    </div>
    <div v-else-if="item.key === 'login'" class="flex items-center gap-3">
      <span class="text-base font-medium leading-5 tracking-[1.5%]">
        {{ item.value }}
      </span>
      <Btn v-if="!refreshHidden" color="icon" @click="emit('refresh')">
        <Icon name="refresh" class="size-5 text-success-100" />
      </Btn>
    </div>
    <span
      v-else
      class="text-base font-medium leading-5 tracking-[1.5%] line-clamp-1"
    >
      {{ item.value }}
    </span>
  </div>
</template>
