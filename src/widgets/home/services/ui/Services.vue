<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import { useRouter } from "vue-router";
import { Btn, Icon, MainServiceCard } from "@/shared/ui";
import { useServiceCards, type ServiceCardItem } from "@/features/services";

const HOME_SERVICES_COUNT = 10;

const router = useRouter();
const emit = defineEmits<{
  (event: "openDetail", service: ServiceCardItem): void;
}>();

const { items } = useServiceCards(HOME_SERVICES_COUNT);
</script>

<template>
  <div
    class="bg-[#09090B] rounded-[30px] lg:rounded-[40px] my-10 lg:my-15 px-5 py-8 md:p-10 lg:py-15"
  >
    <div class="space-y-5">
      <h3
        class="font-semibold text-3xl leading-9 md:text-5xl md:leading-[56px] tracking-[1.5%] text-white"
      >
        {{ $t('home.platformServicesTitle') }}
      </h3>
      <div
        class="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between"
      >
        <p class="text-white text-base leading-5 tracking-[1.5%]">
          {{ $t('home.platformServicesDescription') }}
        </p>
        <Btn
          class="shrink-0 whitespace-nowrap"
          @click="router.push({ name: 'services' })"
        >
          {{ $t('home.allServices') }} <Icon name="arrows" class="size-6 rotate-180" />
        </Btn>
      </div>
    </div>
    <!-- Draggable with the mouse; free mode keeps the old "scroll" feel -->
    <Swiper
      v-if="items.length"
      class="mt-8 md:mt-10 -mx-5 md:-mx-10"
      slides-per-view="auto"
      :space-between="12"
      :slides-offset-before="20"
      :slides-offset-after="20"
      :breakpoints="{
        768: { spaceBetween: 20, slidesOffsetBefore: 40, slidesOffsetAfter: 40 },
      }"
      grab-cursor
      free-mode
      :mousewheel="{ forceToAxis: true }"
      :modules="[FreeMode, Mousewheel]"
    >
      <SwiperSlide
        v-for="service in items"
        :key="service.uuid"
        class="w-[300px]! md:w-[430px]! h-auto!"
      >
        <MainServiceCard
          :data="service"
          @open-detail="emit('openDetail', service)"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
