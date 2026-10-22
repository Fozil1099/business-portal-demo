<script lang="ts" setup>
import Navbar from "@/widgets/navbar/Navbar.vue";
import Footer from "@/widgets/footer/ui/Footer.vue";
</script>

<template>
  <div class="min-h-screen">
    <div class="mx-auto max-w-base px-4 lg:px-1.5 pt-3 lg:pt-5">
      <Navbar />
      <slot />
    </div>
    <Footer class="mt-auto" />
  </div>
</template>
