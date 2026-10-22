import { computed } from "vue";
import { useServices } from "./useServices";
import type { Criterion } from "../api/types";
import { useLocale } from "@/shared/model/useLocale";

export interface ServiceCardItem {
  uuid: string;
  title: string;
  description: string;
  range_rating: string;
  image: string | null;
}

// "20.00" -> "20"
const formatPoints = (value: string) => String(Number(value));

// BOOLEAN даёт 0 или points; QUANTITY копится до max_points (null — без лимита)
const getRangeRating = (criterion: Criterion) => {
  const max =
    criterion.scoring_type === "BOOLEAN"
      ? criterion.points
      : criterion.max_points;
  return max === null ? "0+" : `0-${formatPoints(max)}`;
};

export const useServiceCards = (pageSize?: number) => {
  const { services, isLoading, isInitialLoading, loadMore } =
    useServices(pageSize);
  const { localeKey } = useLocale();

  const items = computed<ServiceCardItem[]>(() =>
    services.value.results.map((criterion) => ({
      uuid: criterion.uuid,
      title: criterion[`title_${localeKey.value}`] || criterion.title,
      description:
        criterion[`description_${localeKey.value}`] || criterion.description,
      range_rating: getRangeRating(criterion),
      image: criterion.image_url,
    })),
  );

  return {
    services,
    items,
    isLoading,
    isInitialLoading,
    loadMore,
  };
};
