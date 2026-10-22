<script lang="ts" setup>
import { SubmissionCard } from "@/entities/submission";
import { AddServiceModal } from "@/features/cabinet/services/add-service";
import { Btn, Icon, LazyScroll, Loader } from "@/shared/ui";
import { useServicesWidget } from "../model/useServicesWidget";

const {
  criterion,
  services,
  canAdd,
  title,
  isLoading,
  isInitialLoading,
  selectedSubmission,
  fetchServices,
  loadMore,
  openAdd,
  openEdit,
  goBack,
} = useServicesWidget();
</script>

<template>
  <div class="space-y-5">
    <Btn color="icon" class="gap-1" @click="goBack">
      <Icon name="arrows" class="size-6" />
      {{ $t('common.back') }}
    </Btn>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h3 class="text-2xl font-bold leading-6 tracking-[1.5%]">
        {{ title }}
      </h3>
      <Btn v-if="canAdd" color="primary" @click="openAdd">
        <Icon name="plus" class="size-6" />
        {{ $t('services.addService') }}
      </Btn>
    </div>
    <Loader :isLoading="isInitialLoading" :data="services.results">
      <LazyScroll
        :isLoading="isLoading && !isInitialLoading"
        :pagination="services.pagination"
        :onLoadMore="loadMore"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          <SubmissionCard
            v-for="item in services.results"
            :key="item.uuid"
            :submission="item"
            @edit="openEdit"
          />
        </div>
      </LazyScroll>
    </Loader>
    <AddServiceModal
      :criterion="criterion"
      :submission="selectedSubmission"
      @update="fetchServices(true)"
    />
  </div>
</template>
