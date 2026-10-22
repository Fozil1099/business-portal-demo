<script lang="ts" setup>
import { LazyScroll, Loader, MainServiceCard } from "@/shared/ui";
import CardDetailModal from "./CardDetailModal.vue";
import { useServicesWidget } from "../model/useServicesWidget";

const {
  services,
  items,
  selectedService,
  isLoading,
  isInitialLoading,
  loadMore,
  openDetail,
} = useServicesWidget();
</script>

<template>
  <div
    class="bg-[#09090B] rounded-[30px] lg:rounded-[40px] my-10 lg:my-15 px-5 py-8 md:p-10 lg:py-15"
  >
    <div class="space-y-5">
      <h3
        class="font-semibold text-3xl leading-9 md:text-5xl md:leading-14 tracking-[1.5%] text-white"
      >
        {{ $t('home.platformServicesTitle') }}
      </h3>
      <div class="flex items-center justify-between">
        <p class="text-white text-base leading-5 tracking-[1.5%]">
          {{ $t('home.platformServicesDescription') }}
        </p>
      </div>
    </div>
    <Loader :is-loading="isInitialLoading" :data="items">
      <LazyScroll
        :on-load-more="loadMore"
        :is-loading="isLoading && !isInitialLoading"
        :pagination="services.pagination"
      >
        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 mt-8 md:mt-10"
        >
          <MainServiceCard
            v-for="service in items"
            :key="service.uuid"
            :data="service"
            @open-detail="openDetail(service)"
          />
        </div>
      </LazyScroll>
    </Loader>
  </div>

  <CardDetailModal :data="selectedService" />
</template>
