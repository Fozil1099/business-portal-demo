<script lang="ts" setup>
import { Btn, Icon, InfoController } from "@/shared/ui";
import type { CompanyCar } from "@/features/cabinet/company";
import { useCompanyWidget } from "../model/useCompanyWidget";

const props = withDefaults(
  defineProps<{
    cars?: CompanyCar[];
  }>(),
  { cars: () => [] },
);

const emit = defineEmits<{
  (e: "update"): void;
  (e: "add"): void;
  (e: "edit", car: CompanyCar): void;
  (e: "delete", car: CompanyCar): void;
}>();

const { transportData } = useCompanyWidget();
</script>

<template>
  <div class="card space-y-5">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold leading-6 tracking-[1.5%]">
        {{ $t('transport.title') }}
      </h3>
      <Btn color="icon" @click="emit('add')">
        <Icon name="plus" class="size-5 text-success-100" />
      </Btn>
    </div>
    <template v-for="(transport, transportIndex) in props.cars">
      <div class="grid grid-cols-12 gap-5">
        <div class="grid grid-cols-3 gap-5 col-span-11">
          <InfoController
            v-for="item in transportData"
            :item="{
              label: item.label,
              key: item.key,
              value: transport[item.key as keyof CompanyCar],
            }"
          />
        </div>
        <div class="col-span-1 flex items-center gap-5">
          <Btn color="icon" @click="emit('edit', transport)">
            <Icon name="edit" class="size-5 text-warning-100" />
          </Btn>
          <Btn color="icon" @click="emit('delete', transport)">
            <Icon name="delete" class="size-5 text-danger-100" />
          </Btn>
        </div>
      </div>
      <div
        class="h-px w-full bg-secondary-300"
        v-if="transportIndex !== props.cars.length - 1"
      ></div
    ></template>
  </div>
</template>

