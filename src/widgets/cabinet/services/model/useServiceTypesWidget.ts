import { onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  useServiceType,
  type CriterionScore,
} from "@/features/cabinet/services/service-type";
import { formatPoints } from "@/entities/submission";

export const useServiceTypesWidget = () => {
  const router = useRouter();
  const { serviceTypes, isLoading, fetchServiceTypes } =
    useServiceType();

  // "20 / 20", если у критерия есть лимит, иначе просто набранные баллы
  const pointsOf = (item: CriterionScore) =>
    item.max_points === null
      ? formatPoints(item.points)
      : `${formatPoints(item.points)} / ${formatPoints(item.max_points)}`;

  const openService = (item: CriterionScore) => {
    router.push({
      name: "cabinet-services-details",
      params: { id: item.criterion },
    });
  };

  onMounted(fetchServiceTypes);

  return { serviceTypes, isLoading, pointsOf, openService };
};
