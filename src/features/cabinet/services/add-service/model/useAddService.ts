import { computed, ref, watch, type Ref } from "vue";
import {
  createSubmission,
  deleteSubmissionPhoto,
  submitSubmission,
  updateSubmission,
  uploadSubmissionPhoto,
} from "../api/addService";
import type { SubmissionCreateRequest } from "../api/types";
import type { Criterion } from "@/entities/criterion";
import { useRegions } from "@/entities/region";
import type { Submission, SubmissionPhoto } from "@/entities/submission";

export const MAX_PHOTOS = 10;

// [широта, долгота], как отдаёт LocationInput
type Coords = [number, number];

const toCoord = (value: number) => value.toFixed(6);

export const useAddService = (
  criterion: Ref<Criterion | null>,
  submission: Ref<Submission | null>,
) => {
  const { regions, districts, fetchRegions, fetchDistricts } = useRegions();

  const region = ref<string | null>(null);
  const district = ref<string | null>(null);
  const coords = ref<Coords | null>(null);
  const note = ref("");
  // option uuid -> количество (строка из инпута)
  const quantities = ref<Record<string, string>>({});
  const newPhotos = ref([]) as Ref<File[]>;
  const photos = ref<SubmissionPhoto[]>([]);

  const loading = ref(false);
  // uuid черновика: если загрузка фото или отправка упали, повтор не создаст вторую заявку
  const draftUuid = ref<string | null>(null);

  const isQuantity = computed(
    () => criterion.value?.scoring_type === "QUANTITY",
  );

  const items = computed(() =>
    Object.entries(quantities.value)
      .map(([option, value]) => ({ option, quantity: Number(value) }))
      .filter((item) => Number.isInteger(item.quantity) && item.quantity >= 1),
  );

  const photosCount = computed(
    () => photos.value.length + newPhotos.value.length,
  );

  const potentialPoints = ref(0);

  const isFormValid = computed(() => {
    const c = criterion.value;
    if (!c || !region.value || !district.value) return false;
    if (c.requires_location && !coords.value) return false;
    if (c.requires_photo && photosCount.value === 0) return false;
    if (photosCount.value > MAX_PHOTOS) return false;
    if (isQuantity.value && items.value.length === 0) return false;
    return true;
  });

  let silentRegionChange = false;

  watch(region, async (uuid) => {
    if (!silentRegionChange) district.value = null;
    silentRegionChange = false;
    await fetchDistricts(uuid);
  });

  const reset = () => {
    const current = submission.value;
    draftUuid.value = current?.uuid ?? null;
    note.value = current?.note ?? "";
    coords.value =
      current?.latitude && current?.longitude
        ? [Number(current.latitude), Number(current.longitude)]
        : null;
    quantities.value = Object.fromEntries(
      (current?.items ?? []).map((item) => [item.option, String(item.quantity)]),
    );
    photos.value = [...(current?.photos ?? [])];
    newPhotos.value = [];
    district.value = current?.district ?? null;
    if (region.value !== (current?.region ?? null)) {
      silentRegionChange = true;
      region.value = current?.region ?? null;
    }
  };

  const open = async () => {
    reset();
    if (!regions.value.length) await fetchRegions();
  };

  const buildPayload = (): SubmissionCreateRequest => ({
    criterion: criterion.value!.uuid,
    region: region.value!,
    district: district.value!,
    latitude: coords.value ? toCoord(coords.value[0]) : null,
    longitude: coords.value ? toCoord(coords.value[1]) : null,
    note: note.value.trim(),
    ...(isQuantity.value ? { items: items.value } : {}),
  });

  const removePhoto = async (photo: SubmissionPhoto) => {
    await deleteSubmissionPhoto(photo.uuid);
    photos.value = photos.value.filter((item) => item.uuid !== photo.uuid);
  };

  // Возвращает отправленную заявку или null, если что-то не прошло (тост покажет интерцептор)
  const save = async (): Promise<Submission | null> => {
    if (!isFormValid.value) return null;
    loading.value = true;

    try {
      const payload = buildPayload();
      if (draftUuid.value) {
        await updateSubmission(draftUuid.value, payload);
      } else {
        const { data } = await createSubmission(payload);
        draftUuid.value = data.uuid;
      }

      // По одному фото за запрос; загруженные убираем из очереди сразу
      while (newPhotos.value.length) {
        const { data } = await uploadSubmissionPhoto(
          draftUuid.value!,
          newPhotos.value[0]!,
        );
        photos.value.push(data);
        newPhotos.value = newPhotos.value.slice(1);
      }

      const { data } = await submitSubmission(draftUuid.value!);
      potentialPoints.value = Number(data.potential_points);
      return data;
    } catch {
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
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
  };
};
