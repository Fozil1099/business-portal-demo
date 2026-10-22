<script lang="ts" setup>
import { Btn, Icon } from "@/shared/ui";
</script>

<template>
  <div class="bg-black min-h-screen w-full overflow-hidden relative pt-24 md:pt-10">
    <h1
      class="text-white text-[160px] md:text-[360px] lg:text-[550px] font-bold leading-[100%] tracking-[25] text-center slide-up-1"
    >
      404
    </h1>
    <img
      src="@/shared/assets/images/404.svg"
      class="absolute left-1/2 -translate-x-1/2 top-48 w-[200px] md:top-64 md:w-[300px] lg:top-80 lg:w-[400px] slide-up-2"
      alt=""
    />
    <h3
      class="text-white text-center text-3xl md:text-[60px] font-bold leading-[100%] tracking-[2%] z-10 sticky px-4 mt-24 md:mt-10 slide-up-3"
    >
      {{ $t("errors.404Title") }}
    </h3>
    <Btn
      color="primary"
      class="mx-auto mt-5 slide-up-4"
      @click="$router.push('/')"
    >
      {{ $t("common.home") }}
      <Icon name="arrows" class="size-6 rotate-180 text-white" />
    </Btn>
  </div>
</template>

<style scoped>
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(500px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUpCentered {
  from {
    opacity: 0;
    transform: translate(0, 500px);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}

.slide-up-1 {
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
}

.slide-up-2 {
  animation: slideUpCentered 0.8s ease-out 0.3s forwards;
  opacity: 0;
}

.slide-up-3 {
  animation: slideUp 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

.slide-up-4 {
  animation: slideUp 0.8s ease-out 0.9s forwards;
  opacity: 0;
}
</style>
