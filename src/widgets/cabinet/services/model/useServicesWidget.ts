import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useServices } from "@/features/cabinet/services/services";
import type { Submission } from "@/entities/submission";
import { useLocale } from "@/shared/model/useLocale";
import { modal } from "@/shared/ui";

export const useServicesWidget = () => {
  const route = useRoute();
  const router = useRouter();
  const { localeKey } = useLocale();
  const {
    criterion,
    services,
    canAdd,
    isLoading,
    isInitialLoading,
    fetchCriterion,
    fetchServices,
    loadMore,
  } = useServices();

  const selectedSubmission = ref<Submission | null>(null);

  const title = computed(() => {
    const item = criterion.value;
    if (!item) return "";
    return item[`title_${localeKey.value}`] || item.title;
  });

  const openAdd = () => {
    selectedSubmission.value = null;
    modal("add-service-modal").show();
  };

  const openEdit = (submission: Submission) => {
    selectedSubmission.value = submission;
    modal("add-service-modal").show();
  };

  const goBack = () => router.push({ name: "cabinet-services" });

  watch(
    () => route.params.id as string,
    (id) => id && fetchCriterion(id),
    { immediate: true },
  );

  return {
    criterion,
    services,
    canAdd,
    title,
    isLoading,
    isInitialLoading,
    selectedSubmission,
    fetchServices,
    loadMore,
    openAdd,
    openEdit,
    goBack,
  };
};
