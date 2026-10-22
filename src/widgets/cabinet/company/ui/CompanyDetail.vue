<script lang="ts" setup>
import { Btn, Icon, InfoController, modal } from "@/shared/ui";
import { useCompanyWidget } from "../model/useCompanyWidget";
import type { CompanyDetail } from "@/features/cabinet/company";

const props = defineProps<{
  company?: CompanyDetail;
}>();

const { personalData } = useCompanyWidget(() => props.company);
</script>

<template>
  <div class="card space-y-5">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold leading-6 tracking-[1.5%]">
        {{ $t('company.title') }}
      </h3>
      <Btn color="icon" @click="modal('company-info-modal').show()">
        <Icon name="edit" class="size-5 text-warning-100" />
      </Btn>
    </div>
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-2">
        <span
          class="text-base font-medium leading-5 tracking-[1.5%] text-secondary-400"
          >{{ $t('company.status') }}:
        </span>
        <span class="text-base font-medium leading-5 tracking-[1.5%]">
          {{ company?.status ? $t('company.statusActive') : $t('company.statusInactive') }}
        </span>
        <img
          v-if="company?.status"
          src="@/shared/assets/images/check.svg"
          alt="check"
          class="size-5"
        />
      </div>
    </div>
    <div class="flex items-start gap-5">
      <div v-if="company?.logo" class="shrink-0">
        <img :src="company.logo" alt="company" class="size-24 object-cover" />
      </div>
      <div v-else class="bg-[#E6E6E6] p-8">
        <Icon name="camera" class="size-12 text-secondary-300" />
      </div>
      <div class="w-full grid grid-cols-6 gap-5">
        <div
          v-for="item in personalData"
          :key="item.label"
          :class="
            item.span == 'full' ? 'col-span-full' : `col-span-${item.span}`
          "
        >
          <InfoController :item="item" :phoneEdit="false" />
        </div>
      </div>
    </div>
  </div>
</template>
