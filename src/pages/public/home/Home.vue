<script lang="ts" setup>
import { ref } from "vue";
import Header from "@/widgets/home/header";
import Services from "@/widgets/home/services";
import Advantages from "@/widgets/home/advantages";
import News from "@/widgets/home/news";
import Questions from "@/widgets/home/questions";
import Banner from "@/widgets/home/banner";
import Download from "@/widgets/home/download";
import { CardDetailModal } from "@/widgets/services";
import { modal } from "@/shared/ui";
import type { ServiceCardItem } from "@/features/services";

// The modal stays mounted (it is shown by id) and is empty until a card is picked
const selectedService = ref<ServiceCardItem | null>(null);

const openServiceDetail = (service: ServiceCardItem) => {
  selectedService.value = service;
  modal("card-detail-modal").show();
};
</script>

<template>
  <Header />
  <Services @open-detail="openServiceDetail" />
  <Advantages />
  <News />
  <Questions />
  <Banner />
  <Download />

  <CardDetailModal :data="selectedService" />
</template>
