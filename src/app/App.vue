<script setup lang="ts">
import MainLayout from "@/widgets/layouts/MainLayout.vue";
import EmptyLayout from "@/widgets/layouts/EmptyLayout.vue";
import { useRoute } from "vue-router";
import CabinetLayout from "@/widgets/layouts/CabinetLayout.vue";
import { useLocale } from "@/shared/model/useLocale";

const { setLocaleFromStorage } = useLocale();

const layouts: {
  [key: string]: any;
} = {
  main: MainLayout,
  empty: EmptyLayout,
  cabinet: CabinetLayout,
};
// Set RTL
const route = useRoute();
setLocaleFromStorage();
</script>

<template>
  <component :is="layouts[route?.meta?.layout as string] || MainLayout">
    <RouterView />
  </component>
</template>
