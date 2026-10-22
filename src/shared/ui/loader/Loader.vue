<script lang="ts" setup>
import type { LoaderProps } from "./loader.props";
import LoaderAnimation from "./LoaderAnimation.vue";

defineProps<LoaderProps>();
</script>

<template>
  <div
    class="w-full h-[55vh] flex items-center justify-center"
    v-if="isLoading"
  >
    <LoaderAnimation />
  </div>
  <div
    class="w-full h-[55vh] flex items-center justify-center"
    v-else-if="data && data.length === 0"
  >
    <p class="text-lg font-medium text-gray-500">{{ $t('common.noData') }}</p>
  </div>
  <div v-else class="min-h-[55vh]">
    <slot />
  </div>
</template>
