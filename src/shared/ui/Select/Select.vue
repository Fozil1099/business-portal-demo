<script lang="ts" setup>
import vSelect from "vue-select";
import { Icon } from "@/shared/ui";
import { type VueSelectProps } from "vue-select";
import type { IconName } from "@/shared/ui/Icon/types";

interface Props {
  icon?: IconName;
}

const { icon, ...rest } = defineProps<Props & Partial<VueSelectProps>>()

const model = defineModel();
</script>

<template>
  <div
    class="flex items-center w-full bg-secondary-200 rounded-lg"
    :class="{ 'pl-3': icon }"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="size-6 text-secondary-300 mr-1"
      :class="{
        'text-success-100': model,
      }"
    />
    <v-select
      v-model="model"
      class="w-full"
      :class="{ with__icon: icon }"
      v-bind="rest"
    />
  </div>
</template>
<style>
@import "@/app/styles/vue-select.css";
</style>
