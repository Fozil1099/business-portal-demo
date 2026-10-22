<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  advantage: {
    title: string;
    description: string;
    image: string;
  };
  isHovered?: boolean;
  shouldShrink?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  hover: [value: boolean];
}>();

// The hover "grow/shrink" effect only makes sense in the desktop masonry layout
const cardHeight = computed(() => {
  if (props.isHovered) return "min-h-[240px] lg:min-h-[431px]";
  if (props.shouldShrink && !props.isHovered)
    return "min-h-[240px] lg:min-h-[259px]";
  return "min-h-[240px] lg:min-h-[345px]";
});

const handleMouseEnter = () => {
  emit("hover", true);
};

const handleMouseLeave = () => {
  emit("hover", false);
};
</script>

<template>
  <div
    class="relative overflow-hidden rounded-[20px] transition-all duration-300"
    :class="cardHeight"
    :style="{
      backgroundImage: `url(${advantage.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="absolute inset-0 bg-linear-to-t from-[#140e2e]/90 via-[#140e2e]/40 to-transparent"
    ></div>

    <div class="absolute inset-0 p-3 md:p-5 flex items-end">
      <div class="space-y-2 text-white card__text p-3 rounded-2xl">
        <h4 class="text-lg md:text-xl font-semibold leading-6">
          {{ $t(advantage.title) }}
        </h4>
        <p class="text-sm leading-4">
          {{ $t(advantage.description) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card__text {
  backdrop-filter: blur(30px);
}
</style>
