<script lang="ts" setup>
interface Props {
  src: string;
  alt?: string;
}

const props = withDefaults(defineProps<Props>(), {
  alt: "Preview",
});

const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => emit("close");
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 p-6"
      @click="handleClose"
    >
      <div class="relative max-h-full max-w-full" @click.stop>
        <button
          class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center"
          @click="handleClose"
          aria-label="Закрыть"
        >
          ✕
        </button>
        <img
          :src="props.src"
          :alt="props.alt"
          class="max-h-[85vh] max-w-[85vw] rounded-lg object-contain shadow-2xl"
        />
      </div>
    </div>
  </Teleport>
</template>
