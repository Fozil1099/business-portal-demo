<script lang="ts" setup>
import MainLayout from "./MainLayout.vue";
import CabinetMenu from "./ui/CabinetMenu.vue";
</script>

<template>
  <MainLayout>
    <div class="grid grid-cols-5 gap-10 py-10">
      <CabinetMenu class="col-span-1" />
      <div class="col-span-4">
        <slot />
      </div>
    </div>
  </MainLayout>
</template>
