import { onMounted, ref } from "vue";
import { getCriteria } from "../api/services";
import type { CriteriaList } from "../api/types";
import type { ResponsePagination } from "@/shared/types";

const PAGE_SIZE = 12;

const emptyPagination = (): ResponsePagination => ({
  total_items: 0,
  total_pages: 1,
  current_page: 1,
  page_size: PAGE_SIZE,
  next_page: null,
  prev_page: null,
});

export const useServices = (pageSize = PAGE_SIZE) => {
  const services = ref<CriteriaList>({
    results: [],
    pagination: emptyPagination(),
  });
  const isLoading = ref(false);
  const isInitialLoading = ref(false);

  const fetchServices = async (isInitial = true) => {
    const nextPage = services.value.pagination.next_page;
    if (!isInitial && !nextPage) return;

    isLoading.value = true;
    isInitialLoading.value = isInitial;

    try {
      const { data } = await getCriteria({
        page: isInitial ? 1 : nextPage!,
        page_size: pageSize,
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

  const loadMore = () => fetchServices(false);

  onMounted(() => {
    fetchServices();
  });

  return {
    services,
    isLoading,
    isInitialLoading,
    fetchServices,
    loadMore,
  };
};
