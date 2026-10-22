<script lang="ts" setup>
import { ServiceCard, Loader } from "@/shared/ui";
import { useServiceTypesWidget } from "../model/useServiceTypesWidget";

const { serviceTypes, isLoading, pointsOf, openService } =
  useServiceTypesWidget();
</script>

<template>
  <Loader :isLoading="isLoading" :data="serviceTypes">
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      <ServiceCard
        v-for="item in serviceTypes"
        :key="item.criterion"
        :title="item.title"
        :value="pointsOf(item)"
        :label="$t('services.currentPoints')"
        @open="openService(item)"
      />
    </div>
  </Loader>
</template>
