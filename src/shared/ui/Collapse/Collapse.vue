<script lang="ts" setup>
import { ref } from "vue";

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <button
      @click="toggle"
      class="w-full flex items-center justify-between py-4 text-left"
    >
      <div
        class="flex-1 font-semibold text-lg leading-6 md:text-[28px] md:leading-[36px] tracking-[1.5%] text-dark"
      >
        <slot name="title" />
      </div>
      <div class="ml-4 shrink-0">
        <svg
          v-if="!isOpen"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19"
            stroke="#121212"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19"
            stroke="#121212"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 12H19"
            stroke="#121212"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </button>
    <Transition name="collapse">
      <div
        v-if="isOpen"
        class="pb-4 text-base leading-[20px] tracking-[1.5%] text-[#333333]"
      >
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px;
}
</style>
