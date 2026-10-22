<script lang="ts" setup>
import { NAV_ITEMS } from "@/widgets/navbar/model/navbarItems";

defineProps<{
  vertical?: boolean;
}>();

const navItems = NAV_ITEMS;
</script>

<template>
  <ul
    class="flex"
    :class="
      vertical
        ? 'flex-col items-start gap-4'
        : 'flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:gap-10'
    "
  >
    <RouterLink
      v-for="item in navItems"
      :key="item.key"
      :to="item.path"
      tag="li"
      class="text-base font-semibold cursor-pointer text__primary__gradient__hover"
      active-class="text__primary__gradient"
    >
      {{ $t(item.name) }}
    </RouterLink>
  </ul>
</template>
