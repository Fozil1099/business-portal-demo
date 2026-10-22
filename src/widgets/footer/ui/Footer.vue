<script lang="ts" setup>
import { Btn } from "@/shared/ui";
import Nav from "@/widgets/navbar/ui/Nav.vue";
import { useCabinetEntry } from "@/features/auth";

const { goToCabinet } = useCabinetEntry();
</script>

<template>
  <footer class="bg-secondary-200 py-10 lg:py-15">
    <div class="mx-auto max-w-base px-4 lg:px-1.5">
      <div
        class="flex flex-col items-center gap-6 lg:flex-row lg:justify-between"
      >
        <div class="flex items-center gap-1.5">
          <img src="@shared/assets/icons/logo.svg" alt="" />
          <span class="font-bold text-xl"> {{ $t("brand.name") }} </span>
        </div>
        <Nav />
        <Btn @click="goToCabinet">{{ $t("common.loginToAccount") }} </Btn>
      </div>
      <div class="h-px w-full bg-secondary-300 rounded-[30px] my-5"></div>
      <p class="text-center text-sm lg:text-base font-medium text-secondary-400">
        {{ $t("brand.copyright") }}
      </p>
    </div>
  </footer>
</template>
