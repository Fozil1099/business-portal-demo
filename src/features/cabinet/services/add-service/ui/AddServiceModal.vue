<script lang="ts" setup>
import { computed, toRef } from "vue";
import {
  Modal,
  ImageInput,
  BaseInput,
  Btn,
  Icon,
  Select,
  modal,
  LocationInput,
  CongratulationModal,
} from "@/shared/ui";
import type { Criterion } from "@/entities/criterion";
import { SubmissionPhotoThumb, type Submission } from "@/entities/submission";
import { useLocale } from "@/shared/model/useLocale";
import { useAddService, MAX_PHOTOS } from "../model";

const props = defineProps<{
  criterion: Criterion | null;
  submission: Submission | null;
}>();

const emit = defineEmits<{
  (event: "update"): void;
}>();

const { localeKey } = useLocale();

// vue-select типизирует опцию как string | object
const reduceValue = (option: string | object) =>
  (option as { value: string }).value;

const {
  regions,
  districts,
  region,
  district,
  coords,
  note,
  quantities,
  newPhotos,
  photos,
  photosCount,
  potentialPoints,
  isQuantity,
  isFormValid,
  loading,
  open,
  removePhoto,
  save,
} = useAddService(toRef(props, "criterion"), toRef(props, "submission"));

type Titled = { title: string; title_ru: string | null; title_uz: string | null };
const titleOf = (item: Titled) => item[`title_${localeKey.value}`] || item.title;

const regionOptions = computed(() =>
  regions.value.map((item) => ({ label: titleOf(item), value: item.uuid })),
);
const districtOptions = computed(() =>
  districts.value.map((item) => ({ label: titleOf(item), value: item.uuid })),
);
const options = computed(() => props.criterion?.options ?? []);

const mapLang = computed(() => (localeKey.value === "uz" ? "uz_UZ" : "ru_RU"));

const handleSubmit = async () => {
  const sent = await save();
  if (!sent) return;
  emit("update");
  modal("add-service-modal").hide();
  modal("congratulation-modal").show();
};
</script>

<template>
  <Modal
    id="add-service-modal"
    :title="criterion ? titleOf(criterion) : $t('services.addServiceTitle')"
    :ok="$t('services.submit')"
    :cancel="$t('common.cancel')"
    size="max-w-xl"
    :loading="loading"
    :okDisabled="!isFormValid || loading"
    @ok="handleSubmit"
    @show="open"
  >
    <div class="space-y-10">
      <div class="space-y-2">
        <p class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500">
          {{ $t('services.photoLabel') }}
          <span class="text-secondary-400">({{ photosCount }}/{{ MAX_PHOTOS }})</span>
        </p>
        <div v-if="photos.length" class="flex flex-wrap gap-2">
          <SubmissionPhotoThumb
            v-for="photo in photos"
            :key="photo.uuid"
            :photo="photo"
          >
            <Btn
              color="icon"
              class="absolute top-1 right-1 rounded-full bg-white p-1!"
              @click="removePhoto(photo)"
            >
              <Icon name="delete" class="size-4 text-danger-100" />
            </Btn>
          </SubmissionPhotoThumb>
        </div>
        <ImageInput
          v-model="newPhotos"
          accept="image/jpeg,image/png,image/webp"
          :placeholder="$t('services.photoPlaceholder')"
          :label="$t('services.photoHint')"
        />
      </div>

      <div class="space-y-2">
        <p class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500">
          {{ $t('services.locationLabel') }}
        </p>
        <LocationInput v-model="coords" :lang="mapLang">
          <template #error>{{ $t('services.mapUnavailable') }}</template>
        </LocationInput>
        <p class="text-xs leading-4 text-secondary-400">
          {{ $t('services.locationHint') }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <p class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500">
            {{ $t('services.regionLabel') }}
          </p>
          <Select
            v-model="region"
            icon="location"
            :options="regionOptions"
            :reduce="reduceValue"
            :placeholder="$t('services.regionLabel')"
            :clearable="false"
          />
        </div>
        <div class="space-y-2">
          <p class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500">
            {{ $t('services.districtLabel') }}
          </p>
          <Select
            v-model="district"
            icon="location"
            :options="districtOptions"
            :reduce="reduceValue"
            :placeholder="$t('services.districtLabel')"
            :disabled="!region"
            :clearable="false"
          />
        </div>
      </div>

      <div v-if="isQuantity" class="space-y-5">
        <div v-for="option in options" :key="option.uuid" class="space-y-2">
          <p class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500">
            {{ titleOf(option) }}
            <span class="text-secondary-400">
              · {{ Number(option.points_per_unit) }} {{ $t('home.points') }} /
              {{ option[`unit_${localeKey}`] || option.unit }}
            </span>
          </p>
          <BaseInput
            v-model="quantities[option.uuid]"
            icon="checkbox"
            type="number"
            min="0"
            :placeholder="$t('services.quantityPlaceholder')"
          />
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-sm font-normal leading-4 tracking-[1.5%] text-secondary-500">
          {{ $t('services.noteLabel') }}
        </p>
        <BaseInput v-model="note" :placeholder="$t('services.notePlaceholder')" />
      </div>
    </div>
  </Modal>
  <CongratulationModal :title="$t('services.sentTitle')">
    {{ $t('services.sentText', { points: potentialPoints }) }}
  </CongratulationModal>
</template>
