<script lang="ts" setup>
import { Btn, Icon } from "@/shared/ui";
</script>

<template>
  <div
    class="flex flex-col lg:flex-row items-center gap-10 lg:gap-[170px] py-10"
  >
    <div class="space-y-6 lg:space-y-10">
      <h2
        class="text-4xl leading-11 md:text-6xl md:leading-[68px] lg:text-7xl lg:leading-20 font-semibold tracking-[-3%]"
      >
        <span v-html="$t('home.downloadTitle', { 
          today: `<span class='text__primary__gradient'>${$t('home.downloadToday')}</span>`, 
          everyday: `<span class='text__primary__gradient'>${$t('home.downloadEveryday')}</span>` 
        })"></span>
      </h2>
      <p
        class="text-base md:text-xl font-medium leading-5 tracking-[1.5%] text-secondary-400"
      >
        {{ $t('home.downloadDescription') }}
      </p>
      <div class="flex flex-wrap items-center gap-3 md:gap-4">
        <Btn class="min-w-[160px] md:min-w-[180px]">
          <Icon name="google-play" class="size-6" />
          <div class="text-start">
            <p class="text-xs font-medium leading-[133%] tracking-[0%]">
              {{ $t('home.download') }}
            </p>
            <p class="text-base font-medium leading-5 tracking-[1.5%]">
              Google Play 
            </p>
          </div>
        </Btn>
        <Btn class="min-w-[160px] md:min-w-[180px]">
          <Icon name="apple" class="size-6" />
          <div class="text-start">
            <p class="text-xs font-medium leading-[133%] tracking-[0%]">
              {{ $t('home.download') }}
            </p>
            <p class="text-base font-medium leading-5 tracking-[1.5%]">
              App Store
            </p>
          </div>
        </Btn>
      </div>
    </div>
    <img
      src="@/shared/assets/images/app.svg"
      class="w-full max-w-[320px] md:max-w-[424px] lg:w-auto"
      alt="download"
    />
  </div>
</template>
