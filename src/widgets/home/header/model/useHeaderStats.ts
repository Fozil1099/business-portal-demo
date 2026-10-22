import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { formatStatNumber } from "@/shared/utils/formatter";

// Данные, которые нужны от бэкенда (один публичный эндпоинт статистики)
export interface HomeStats {
  enterprises: number; // количество предприятий на платформе
  trees: number; // количество поданных заявок
  certified_count: number; // сертифицированные компании
}

// Демо-данные: заменить ответом API
const PLACEHOLDER_STATS: HomeStats = {
  enterprises: 2735,
  trees: 18600,
  certified_count: 912,
};

export const useHeaderStats = () => {
  const { t } = useI18n();
  const stats = ref<HomeStats>(PLACEHOLDER_STATS);

  // Два квадрата сверху
  const squares = computed(() => [
    {
      key: "enterprises",
      label: t("home.statsEnterprises"),
      value: formatStatNumber(stats.value.enterprises),
    },
    {
      key: "trees",
      label: t("home.statsTrees"),
      value: formatStatNumber(stats.value.trees, true),
    },
  ]);

  // Широкий прямоугольник снизу
  const wide = computed(() => ({
    label: t("home.statsStatus"),
    value: formatStatNumber(stats.value.certified_count),
    caption: t("home.statsStatusCaption"),
  }));

  return {
    stats,
    squares,
    wide,
  };
};
