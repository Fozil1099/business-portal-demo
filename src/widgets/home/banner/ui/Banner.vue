<script lang="ts" setup>
import { Btn, Icon } from "@/shared/ui";
import { useCabinetEntry } from "@/features/auth";

const { goToCabinet } = useCabinetEntry();
</script>

<template>
  <div class="py-10 lg:py-15">
    <div
      class="relative overflow-hidden rounded-[24px] lg:rounded-[30px] min-h-[240px] md:min-h-[236px] lg:min-h-0 max-h-[400px] shadow-lg h-full"
    >
      <!-- The banner image is very wide: on small screens it covers the block instead -->
      <img
        src="@shared/assets/images/home/banner.png"
        alt="banner"
        class="absolute inset-0 size-full object-cover lg:static lg:h-auto"
      />
      <div
        class="absolute inset-0 flex flex-col items-start justify-center gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-20"
      >
        <h3
          class="text-3xl md:text-5xl lg:text-7xl font-semibold tracking-[1.5%] text-white"
        >
          {{ $t('home.bannerTitle') }}
        </h3>
        <Btn @click="goToCabinet">
          {{ $t('common.loginToAccount') }}
          <Icon name="arrows" class="size-6 rotate-180" />
        </Btn>
      </div>
    </div>
  </div>
</template>
