<script setup lang="ts">
import { computed } from "vue";
import { sprites } from "./sprite.gen";
import clsx from "clsx";
import type { IconName } from "./types";

/** Icon props extending SVG props and requiring specific icon name */
interface IconProps {
  name: IconName;
  class?: any;
}

const props = defineProps<IconProps>();

/** Safe wrapper for extracting icon metadata */
const getIconMeta = (name: IconName) => {
  const iconName = name;
  const item = sprites.experimental_get("sprite", iconName!, config);

  if (!item) {
    console.error(`Icon "${name}" is not found in "sprite" sprite`);
    return sprites.experimental_get("general", "help", config)!;
  }
  return item;
};

const config = {
  baseUrl: "/sprites/",
};

const meta = computed(() => {
  const meta = getIconMeta(props.name);
  const { width, height } = meta.symbol;

  return {
    ...meta,
    className: clsx(
      {
        "icon-x": width > height,
        "icon-y": width < height,
        icon: width === height,
      },
      props.class,
    ),
  };
});
</script>

<template>
  <svg
    v-bind="props"
    :class="meta.className"
    :viewBox="meta.symbol.viewBox"
    focusable="false"
    :aria-hidden="true"
  >
    <use :href="meta.href" />
  </svg>
</template>
