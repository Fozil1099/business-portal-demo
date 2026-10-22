import { computed, ref } from "vue";
import { getSubmissions } from "../api/servicesApi";
import type { SubmissionList } from "../api/types";
import { getCriterion, type Criterion } from "@/entities/criterion";
import type { ResponsePagination } from "@/shared/types";

const PAGE_SIZE = 12;

const emptyPagination = (): ResponsePagination => ({
  current_page: 1,
  page_size: PAGE_SIZE,
  next_page: null,
  prev_page: null,
});

export const useServices = () => {
  const criterion = ref<Criterion | null>(null);
  const services = ref<SubmissionList>({
    results: [],
    pagination: emptyPagination(),
  });
  const isLoading = ref(false);
  const isInitialLoading = ref(false);

  // allows_multiple = false: одна живая или одобренная заявка на компанию
  const canAdd = computed(
    () =>
      !!criterion.value &&
      (criterion.value.allows_multiple ||
        !services.value.results.some((item) => item.status !== "REJECTED")),
  );

  const fetchServices = async (isInitial = true) => {
    const nextPage = services.value.pagination.next_page;
    if (!criterion.value || (!isInitial && !nextPage)) return;

    isLoading.value = true;
    isInitialLoading.value = isInitial;

    try {
      const { data } = await getSubmissions({
        criterion: criterion.value.code,
        page: isInitial ? 1 : nextPage!,
        page_size: PAGE_SIZE,
      });

      if (isInitial) {
        services.value = data;
      } else {
        services.value.results.push(...data.results);
        services.value.pagination = data.pagination;
      }
    } catch {
      if (isInitial) {
        services.value = { results: [], pagination: emptyPagination() };
      }
    } finally {
      isLoading.value = false;
      isInitialLoading.value = false;
    }
  };

  const fetchCriterion = async (uuid: string) => {
    isInitialLoading.value = true;
    try {
      const { data } = await getCriterion(uuid);
      criterion.value = data;
    } catch {
      isInitialLoading.value = false;
      return;
    }
    await fetchServices(true);
  };

  const loadMore = () => fetchServices(false);

  return {
    criterion,
    services,
    canAdd,
    isLoading,
    isInitialLoading,
    fetchCriterion,
    fetchServices,
    loadMore,
  };
};
