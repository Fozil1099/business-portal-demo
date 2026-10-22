<script lang="ts" setup>
import { Modal, Btn, Icon, modal } from "@/shared/ui";
import { useCabinetEntry } from "@/features/auth";

interface Props {
  data: {
    title: string;
    description: string;
    range_rating: string;
    image?: string | null;
  } | null;
}

const { data } = defineProps<Props>();
const { goToCabinet } = useCabinetEntry();

const handleLogin = () => {
  modal("card-detail-modal").hide();
  goToCabinet();
};
</script>

<template>
  <Modal id="card-detail-modal" no-body footer-hidden>
    <img
      v-if="data?.image"
      :src="data.image"
      :alt="data.title"
      class="w-full h-full object-cover"
    />
    <div class="px-5 pt-5 pb-6 md:px-10 md:pt-7 md:pb-10">
      <h3 class="text-xl leading-7 md:text-[28px] md:leading-9 font-semibold tracking-[1.5%] mb-4 md:mb-5">
        {{ data?.title }}
      </h3>
      <p
        v-if="data?.description"
        class="text-base font-medium leading-5 tracking-[1.5%] mb-5"
      >
        {{ data?.description }}
      </p>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span
          class="text-[20px] font-semibold leading-[100%] tracking-[1.5%]"
          >{{ data?.range_rating }} {{ $t("home.points") }}</span
        >
        <Btn color="primary" @click="handleLogin">
          {{ $t("home.loginToAccount") }}
          <Icon name="arrows" class="size-6 rotate-180" />
        </Btn>
      </div>
    </div>
  </Modal>
</template>
