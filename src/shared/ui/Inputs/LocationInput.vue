<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { loadYandexMaps, type YMaps } from "@/shared/utils/yandexMaps";

// [широта, долгота]
export type Coords = [number, number];

interface Props {
  center?: Coords;
  zoom?: number;
  lang?: string;
}

const props = withDefaults(defineProps<Props>(), {
  // Ташкент
  center: () => [48.858370, 2.294481],
  zoom: 12,
  lang: "ru_RU",
});

const model = defineModel<Coords | null>({ default: null });

const container = ref<HTMLDivElement | null>(null);
const failed = ref(false);

let ymaps: YMaps = null;
let map: YMaps = null;
let placemark: YMaps = null;

const setPlacemark = (coords: Coords | null) => {
  if (!map) return;
  if (!coords) {
    if (placemark) map.geoObjects.remove(placemark);
    placemark = null;
    return;
  }
  if (placemark) {
    placemark.geometry.setCoordinates(coords);
    return;
  }
  placemark = new ymaps.Placemark(
    coords,
    {},
    { draggable: true, preset: "islands#violetDotIcon" },
  );
  placemark.events.add("dragend", () => {
    model.value = placemark.geometry.getCoordinates() as Coords;
  });
  map.geoObjects.add(placemark);
};

onMounted(async () => {
  try {
    ymaps = await loadYandexMaps(props.lang);
  } catch {
    failed.value = true;
    return;
  }
  if (!container.value) return;

  map = new ymaps.Map(
    container.value,
    {
      center: model.value ?? props.center,
      zoom: props.zoom,
      controls: ["zoomControl", "geolocationControl"],
    },
    { suppressMapOpenBlock: true },
  );
  map.events.add("click", (event: YMaps) => {
    model.value = event.get("coords") as Coords;
  });
  setPlacemark(model.value);
});

watch(model, (coords) => {
  setPlacemark(coords);
  if (coords && map) map.panTo(coords);
});

onBeforeUnmount(() => {
  map?.destroy();
  map = null;
  placemark = null;
});
</script>

<template>
  <div class="relative h-[136px] w-full overflow-hidden rounded-xl bg-secondary-200">
    <div ref="container" class="size-full" data-test="map"></div>
    <p
      v-if="failed"
      class="absolute inset-0 flex items-center justify-center p-3 text-center text-sm text-secondary-400"
    >
      <slot name="error">Map is unavailable</slot>
    </p>
  </div>
</template>
