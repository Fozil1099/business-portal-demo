<script lang="ts" setup>
import { ref } from "vue";
import AdvantagesGrid from "./AdvantagesGrid.vue";
import project1 from "@/shared/assets/images/home/project1.jpg";
import project2 from "@/shared/assets/images/home/project2.svg";
import project3 from "@/shared/assets/images/home/project3.jpg";

const hoveredIndex = ref<number | null>(null);

const handleCardHover = (index: number, isHovered: boolean) => {
  hoveredIndex.value = isHovered ? index : null;
};

// Определяем, должна ли карточка уменьшиться
const shouldShrink = (index: number) => {
  if (hoveredIndex.value === null) return false;
  if (hoveredIndex.value === index) return false; // Наведенная карточка не уменьшается

  const hovered = hoveredIndex.value;

  // Если индекс четный - уменьшается следующая карточка (index + 1)
  // Если индекс нечетный - уменьшается предыдущая карточка (index - 1)
  if (hovered % 2 === 0) {
    // Четный индекс - уменьшается следующая
    return index === hovered + 1;
  } else {
    // Нечетный индекс - уменьшается предыдущая
    return index === hovered - 1;
  }
};

// title/description are i18n keys under "advantages"
const advantages = [
  {
    key: "priority",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "economic",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "financing",
    image: project1,
  },
  {
    key: "export",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "inspections",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "promotion",
    image: project2,
  },
  {
    key: "education",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "awards",
    image: project3,
  },
].map(({ key, image }) => ({
  title: `advantages.${key}.title`,
  description: `advantages.${key}.description`,
  image,
}));
</script>

<template>
  <div class="py-10 lg:py-15 space-y-8 lg:space-y-10">
    <h3
      class="font-semibold text-3xl leading-9 md:text-5xl md:leading-14 tracking-[1.5%]"
    >
      <span v-html="$t('home.advantagesTitle', {
        advantages: `<span class='text__primary__gradient'>${$t('home.advantagesHighlight')}</span>`,
        participant: `<span class='text__primary__gradient'>${$t('home.participantHighlight')}</span>`
      })"></span>
    </h3>

    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:flex lg:flex-col lg:flex-wrap lg:max-h-[710px]"
    >
      <AdvantagesGrid
        v-for="(advantage, index) in advantages"
        :key="index"
        :advantage="advantage"
        :is-hovered="hoveredIndex === index"
        :should-shrink="shouldShrink(index)"
        @hover="(isHovered) => handleCardHover(index, isHovered)"
      />
    </div>
  </div>
</template>
