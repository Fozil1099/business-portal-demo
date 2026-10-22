<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import type { LazyScrollProps } from "./lazy-scroll.props";

const props = withDefaults(defineProps<LazyScrollProps>(), {
  isLoading: false,
  threshold: 300,
});

const scrollContainer = ref<HTMLDivElement | null>(null);
const observerTarget = ref<HTMLDivElement | null>(null);
const isObserverActive = ref(false);

// Вычисляем hasMore на основе pagination
const hasMore = computed(() => {
  return props.pagination.next_page !== null && props.pagination.next_page !== undefined;
});

const handleScroll = async () => {
  if (!observerTarget.value || props.isLoading || !hasMore.value) return;

  const rect = observerTarget.value.getBoundingClientRect();
  const isNearBottom = rect.top - window.innerHeight < props.threshold;

  if (isNearBottom && !isObserverActive.value) {
    isObserverActive.value = true;
    await props.onLoadMore();
    isObserverActive.value = false;
  }
};

const setupIntersectionObserver = () => {
  if (!observerTarget.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !props.isLoading &&
          hasMore.value &&
          !isObserverActive.value
        ) {
          isObserverActive.value = true;
          Promise.resolve(props.onLoadMore()).then(() => {
            isObserverActive.value = false;
          });
        }
      });
    },
    {
      root: null,
      rootMargin: `${props.threshold}px`,
      threshold: 0.01,
    }
  );

  observer.observe(observerTarget.value);

  return observer;
};

let scrollObserver: IntersectionObserver | undefined;
let scrollListener: (() => void) | undefined;

onMounted(() => {
  // Setup intersection observer
  scrollObserver = setupIntersectionObserver();

  // Fallback scroll listener
  scrollListener = handleScroll;
  window.addEventListener("scroll", scrollListener);
});

onUnmounted(() => {
  if (scrollObserver) {
    scrollObserver.disconnect();
  }

  if (scrollListener) {
    window.removeEventListener("scroll", scrollListener);
  }
});
</script>

<template>
  <div ref="scrollContainer" class="relative w-full">
    <!-- Content slot -->
    <slot />

    <!-- Observer target -->
    <div ref="observerTarget" class="h-1 w-full" />

    <!-- Loading indicator -->
    <div v-if="isLoading" class="flex justify-center py-8">
      <div class="flex items-center gap-2">
        <div class="flex gap-1">
          <span
            class="inline-block w-2 h-2 rounded-full bg-success-100"
            style="animation: bounce 1.4s infinite"
          />
          <span
            class="inline-block w-2 h-2 rounded-full bg-success-100"
            style="animation: bounce 1.4s infinite 0.2s"
          />
          <span
            class="inline-block w-2 h-2 rounded-full bg-success-100"
            style="animation: bounce 1.4s infinite 0.4s"
          />
        </div>
        <span class="text-sm font-medium text-success-100">
          Загрузка больше...
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-4px);
    opacity: 0.5;
  }
}
</style>
