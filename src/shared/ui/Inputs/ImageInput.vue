<script lang="ts" setup>
import { ref, computed } from "vue";
import { ImagePreview } from "@/shared/ui";

interface Props {
  modelValue?: File[];
  placeholder?: string;
  label?: string;
  accept?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  placeholder: "Добавьте фотографии вашей посадки.",
  label: "На фоне ваше лицо обязательно.",
  accept: "image/*",
});

const emit = defineEmits<{
  "update:modelValue": [value: File[]];
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const activePreviewUrl = ref<string | null>(null);

const imageUrls = computed(() => {
  return props.modelValue.map((file) => URL.createObjectURL(file));
});

const handleClick = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    const newFiles = Array.from(files);
    // Добавляем новые файлы к существующим
    emit("update:modelValue", [...props.modelValue, ...newFiles]);
  }
};

const removeImage = (index: number) => {
  const newFiles = props.modelValue.filter((_, i) => i !== index);
  emit("update:modelValue", newFiles);

  // Очищаем input если все файлы удалены
  if (newFiles.length === 0 && fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};

const clearAllImages = () => {
  emit("update:modelValue", []);
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};

const openPreview = (url: string) => {
  activePreviewUrl.value = url;
};

const closePreview = () => {
  activePreviewUrl.value = null;
};
</script>

<template>
  <div
    class="bg-secondary-200 rounded-xl p-3 cursor-pointer transition-opacity hover:opacity-80 relative"
    @click="handleClick"
  >
    <!-- Кнопка удаления всех в углу компонента -->
    <button
      v-if="imageUrls.length > 0"
      @click.stop="clearAllImages"
      class="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center bg-success-100/80 justify-center transition-colors shadow-md z-10"
      title="Удалить все изображения"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Сетка изображений -->
    <div v-if="imageUrls.length > 0" class="flex items-center gap-3 mb-6">
      <div
        v-for="(url, index) in imageUrls"
        :key="index"
        class=" relative group"
      >
        <img
          :src="url"
          alt="Preview"
          class="w-12 h-12 rounded-full object-cover"
          @click.stop="openPreview(url)"
        />
        <!-- Кнопка удаления для каждого изображения -->
        <button
          @click.stop="removeImage(index)"
          class="absolute top-1 right-1 w-5 h-5 bg-success-100 rounded-full flex items-center justify-center transition-colors shadow-md opacity-0 group-hover:opacity-100"
          title="Удалить"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Плейсхолдер когда нет изображений -->
    <div v-else class="w-12 h-12 rounded-full overflow-hidden relative mb-6">
      <div
        class="w-full h-full bg-secondary-300 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-secondary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>

    <div>
      <p
        class="text-xl font-normal leading-5 tracking-[1.5%] text-secondary-400"
      >
        {{ placeholder }}
      </p>
      <p
        class="text-xl font-normal leading-5 tracking-[1.5%] text__orange__gradient"
      >
        {{ label }}
      </p>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      :accept="accept"
      multiple
      class="hidden"
      @change="handleFileChange"
      @click.stop
    />
  </div>

  <ImagePreview v-if="activePreviewUrl" :src="activePreviewUrl" @close="closePreview" />
</template>
