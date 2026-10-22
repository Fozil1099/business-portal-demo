<script lang="ts" setup>
import { computed, ref } from "vue";
import { Icon, Btn } from "@/shared/ui";

withDefaults(
  defineProps<{
    hint?: string;
    buttonText?: string;
  }>(),
  {
    hint: "Добавьте фотографию вашей компани в формате jpeng или png",
    buttonText: "Файл",
  },
);

const model = defineModel<File | string | null>({ default: null });

const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);

const displayUrl = computed(
  () =>
    previewUrl.value ?? (typeof model.value === "string" ? model.value : null),
);

function openDialog() {
  fileInput.value?.click();
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] ?? null;
  model.value = file;

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }

  if (file) {
    previewUrl.value = URL.createObjectURL(file);
  }
}

function clearFile() {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
  model.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
}
</script>

<template>
  <div class="flex items-start gap-3">
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png"
      class="hidden"
      @change="onFileChange"
    />
    <div class="relative w-40 h-40 shrink-0">
      <img
        v-if="displayUrl"
        :src="displayUrl"
        alt="avatar preview"
        class="w-40 h-40 object-cover rounded-xl cursor-pointer"
        @click="openDialog"
      />
      <div
        v-else
        class="bg-secondary-200 rounded-xl w-40 h-40 flex items-center justify-center cursor-pointer overflow-hidden"
        @click="openDialog"
      >
        <Icon name="camera" class="size-[52px] text-secondary-300" />
      </div>

      <button
        v-if="displayUrl"
        type="button"
        class="absolute top-1.5 right-1.5 bg-white/80 hover:bg-white rounded-full p-0.5 shadow transition"
        @click="clearFile"
      >
        <Icon name="x" class="size-4 text-secondary-600" />
      </button>
    </div>

    <div class="space-y-5">
      <p class="text-secondary-500 text-sm font-normal">
        {{ hint }}
      </p>
      <Btn color="primary" type="button" @click="openDialog">
        <Icon name="file" class="size-6 text-white" />
        {{ buttonText }}
      </Btn>
    </div>
  </div>
</template>
