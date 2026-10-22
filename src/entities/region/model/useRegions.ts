import { ref } from "vue";
import { getDistricts, getRegions } from "../api/region";
import type { District, Region } from "./types";

export const useRegions = () => {
  const regions = ref<Region[]>([]);
  const districts = ref<District[]>([]);
  const isLoading = ref(false);

  const fetchRegions = async () => {
    isLoading.value = true;
    try {
      const { data } = await getRegions();
      regions.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchDistricts = async (regionUuid: string | null) => {
    districts.value = [];
    if (!regionUuid) return;
    const { data } = await getDistricts(regionUuid);
    districts.value = data;
  };

  return { regions, districts, isLoading, fetchRegions, fetchDistricts };
};
