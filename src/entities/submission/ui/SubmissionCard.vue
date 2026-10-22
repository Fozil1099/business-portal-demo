<script lang="ts" setup>
import { computed } from "vue";
import { formatDate } from "@vueuse/core";
import { Btn, Icon } from "@/shared/ui";
import type { Submission } from "../model/types";
import { usePhotoUrl } from "../model/usePhotoUrl";
import { formatPoints, isEditable, statusColor } from "../lib/status";

const props = defineProps<{ submission: Submission }>();

const emit = defineEmits<{
  (event: "edit", submission: Submission): void;
}>();

const photo = usePhotoUrl(() => props.submission.photos[0]?.image_url);

const date = computed(() =>
  formatDate(
    new Date(props.submission.submitted_at ?? props.submission.created_at),
    "DD.MM.YYYY",
  ),
);

const types = computed(() =>
  props.submission.items.map((item) => item.option_title).join(", "),
);

const quantities = computed(() =>
  props.submission.items
    .map((item) => `${item.quantity} ${item.unit}`)
    .join(", "),
);

const mapUrl = computed(() => {
  const { latitude, longitude } = props.submission;
  if (!latitude || !longitude) return null;
  return `https://yandex.com/maps/?pt=${longitude},${latitude}&z=17&l=map`;
});

const editable = computed(() => isEditable(props.submission.status));
</script>

<template>
  <div class="bg-secondary-200 p-5 rounded-[20px] flex flex-col">
    <div class="rounded-xl overflow-hidden h-32 bg-white">
      <img
        v-if="photo"
        :src="photo"
        :alt="submission.criterion_title"
        class="w-full h-32 object-cover"
      />
      <div v-else class="size-full flex items-center justify-center">
        <Icon name="camera" class="size-10 text-secondary-300" />
      </div>
    </div>
    <div class="pt-3 pb-5 space-y-2 flex-1">
      <div class="flex items-center justify-between gap-3">
        <p
          class="text-sm font-medium leading-4 tracking-[1.5%] text-secondary-400"
        >
          {{ $t("services.date") }}
        </p>
        <h3 class="text-sm font-semibold leading-6 tracking-[1.5%]">
          {{ date }}
        </h3>
      </div>
      <div v-if="types" class="flex items-center justify-between gap-3">
        <p
          class="text-sm font-medium leading-4 tracking-[1.5%] text-secondary-400"
        >
          {{ $t("services.type") }}
        </p>
        <h3 class="text-sm font-semibold leading-6 tracking-[1.5%] text-right">
          {{ types }}
        </h3>
      </div>
      <div v-if="quantities" class="flex items-center justify-between gap-3">
        <p
          class="text-sm font-medium leading-4 tracking-[1.5%] text-secondary-400"
        >
          {{ $t("services.quantityLabel") }}
        </p>
        <h3 class="text-sm font-semibold leading-6 tracking-[1.5%] text-right">
          {{ quantities }}
        </h3>
      </div>
      <div class="flex items-center justify-between gap-3">
        <p
          class="text-sm font-medium leading-4 tracking-[1.5%] text-secondary-400"
        >
          {{ $t("services.district") }}
        </p>
        <h3 class="text-sm font-semibold leading-6 tracking-[1.5%] text-right">
          {{ submission.district_title }}
        </h3>
      </div>
      <div v-if="mapUrl" class="flex items-center justify-between gap-3">
        <p
          class="text-sm font-medium leading-4 tracking-[1.5%] text-secondary-400"
        >
          {{ $t("services.locationLabel") }}
        </p>
        <a
          :href="mapUrl"
          target="_blank"
          rel="noopener"
          class="text__primary__gradient"
        >
          <div class="flex items-center">
            <span class="text-sm font-semibold leading-6 tracking-[1.5%] mb-0.5">
              {{ $t("services.openMap") }}
            </span>
            <Icon name="right" class="size-5 text-success-100" />
          </div>
        </a>
      </div>
      <p
        v-if="submission.status === 'REJECTED' && submission.rejection_reason"
        class="text-sm leading-4 text-danger-100"
      >
        {{ $t("services.rejectionReason") }}: {{ submission.rejection_reason }}
      </p>
    </div>
    <div class="flex items-center justify-between gap-3">
      <Btn :color="statusColor[submission.status]">
        {{ $t(`services.status.${submission.status}`) }}
      </Btn>
      <h3
        v-if="submission.status === 'APPROVED'"
        class="text-[32px] text__primary__gradient font-bold leading-9 tracking-[1.5%]"
      >
        {{ formatPoints(submission.awarded_points) }}
      </h3>
      <h3
        v-else-if="submission.status === 'SUBMITTED'"
        class="text-[32px] text-warning-100 font-bold leading-9 tracking-[1.5%]"
      >
        {{ formatPoints(submission.potential_points) }}
      </h3>
      <Btn
        v-else-if="editable"
        :color="statusColor[submission.status]"
        @click="emit('edit', submission)"
      >
        <Icon name="edit" class="size-5" />
      </Btn>
    </div>
  </div>
</template>
