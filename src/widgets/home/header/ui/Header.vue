<script lang="ts" setup>
import { Btn, Icon, StatCard } from "@/shared/ui";
import { useCabinetEntry } from "@/features/auth";
import { useHeaderStats } from "../model/useHeaderStats";

const { goToCabinet } = useCabinetEntry();
const { squares, wide } = useHeaderStats();
</script>

<template>
  <section
    class="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 lg:gap-20 pb-10 lg:pb-15 pt-6 lg:pt-5"
  >
    <div class="flex flex-col gap-6 lg:gap-10 justify-end">
      <h1
        class="text-[40px] leading-11 md:text-6xl md:leading-[68px] lg:text-7xl lg:leading-[80px] font-semibold tracking-[-3%]"
      >
        <span v-html="$t('home.headerTitle', {
          example: `<span class='text__primary__gradient'>${$t('home.headerExample')}</span>`,
          convenient: `<span class='text__primary__gradient'>${$t('home.headerConvenient')}</span>`
        })"></span>
      </h1>
      <p>
        {{ $t('home.headerDescription') }}
      </p>
      <Btn class="w-fit" @click="goToCabinet">
        {{ $t('common.loginToAccount') }}

        <Icon name="arrows" class="size-6 rotate-180" />
      </Btn>
    </div>
    <div class="flex flex-col gap-y-3 w-full">
      <div class="flex items-end justify-start gap-3">
        <!-- Занимает место прежнего фото 312×350, чтобы отступы не менялись -->
        <div class="w-[45%] sm:w-[312px] shrink-0 aspect-[312/350] flex items-end">
          <div class="w-full h-full sm:h-[280px] flex flex-col gap-2 sm:gap-3">
            <div class="grid grid-cols-2 gap-2 sm:gap-3">
              <StatCard
                v-for="item in squares"
                :key="item.key"
                :label="item.label"
                :value="item.value"
                size="sm"
                class="aspect-square"
              />
            </div>
            <StatCard
              :label="wide.label"
              :value="wide.value"
              :caption="wide.caption"
              variant="primary"
              size="sm"
              class="flex-1 min-h-0"
            />
          </div>
        </div>
        <div
          class="bg-secondary-200 rounded-[20px] p-4 sm:p-5 pb-16 sm:pb-5 relative w-full min-h-[180px] sm:min-h-0 sm:h-[280px]"
        >
          <h3
            class="text-5xl sm:text-[84px] font-bold leading-[100%] mb-2 sm:mb-0"
          >
            {{ $t('home.statsLabel') }}
          </h3>
          <img
            src="@/shared/assets/images/header/header-card-icon.svg"
            class="size-10 sm:size-[60px] absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-10"
            alt=""
          />
          <p
            class="text-xs sm:text-base font-medium text-secondary-400 sticky z-20"
          >
            {{ $t('home.statsCompanies') }}
          </p>
        </div>
      </div>
      <!-- Макет 584×216 (Figma 1573:9824); размеры в cqw, чтобы карточка масштабировалась как прежняя картинка -->
      <div class="col-span-2 @container">
        <div
          class="relative overflow-hidden bg-black rounded-[3.42cqw] aspect-[584/216] text-white"
        >
          <div
            class="absolute left-[-27.05cqw] top-[-19.18cqw] w-[86.01cqw] h-[99.77cqw] flex items-center justify-center"
          >
            <img
              src="@/shared/assets/images/header/header-card-bg.png"
              class="w-[84.25cqw] h-[55.14cqw] max-w-none object-cover object-bottom opacity-70 rotate-[115.48deg] pointer-events-none"
              alt=""
            />
          </div>
          <div
            class="absolute bottom-0 right-[3.42cqw] flex items-end gap-[2.05cqw]"
          >
            <span
              class="w-[9.59cqw] h-[16.44cqw] rounded-t-[1.37cqw] bg-linear-120 from-[#c4bcfb] to-[#a99df9]"
            ></span>
            <span
              class="w-[9.59cqw] h-[23.29cqw] rounded-t-[1.37cqw] bg-linear-112 from-[#a99df9] to-[#7c6cf0]"
            ></span>
            <span
              class="w-[9.59cqw] h-[28.42cqw] rounded-t-[1.37cqw] bg-linear-109 from-[#8b7cf6] to-success-100"
            ></span>
          </div>
          <div
            class="absolute left-[3.42cqw] top-[calc(50%-0.17cqw)] -translate-y-1/2 w-[60.1cqw] flex flex-col gap-[2.74cqw]"
          >
            <p class="text-[2.4cqw] font-medium leading-[1.143] tracking-[0.015em]">
              {{ $t('home.activityCardSubtitle') }}
            </p>
            <p class="text-[5.48cqw] font-semibold leading-[1.1875] tracking-[0.015em]">
              {{ $t('home.activityCardTitle') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
