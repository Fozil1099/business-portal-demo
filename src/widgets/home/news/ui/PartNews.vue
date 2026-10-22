<script lang="ts" setup>
interface Props {
  newsItem: {
    title: string;
    date: string;
  };
}

defineProps<Props>();
</script>

<template>
  <div class="mt-3">
    <div class="px-2 md:px-5 pt-3 border-t border-gray-200">
      <p
        class="text-lg md:text-xl font-semibold text-black leading-6 mb-2 line-clamp-2"
      >
        {{ newsItem.title }}
      </p>
      <p class="text-xs text-gray-500">{{ newsItem.date }}</p>
    </div>
  </div>
</template>
