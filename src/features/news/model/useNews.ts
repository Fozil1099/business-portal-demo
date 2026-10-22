import { computed, onMounted, ref } from "vue";
import { getNews } from "../api/news";
import type { NewsList } from "../api/types";
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

export const useNews = (pageSize = PAGE_SIZE) => {
  const news = ref<NewsList>({ results: [], pagination: emptyPagination() });
  const isLoading = ref(false);
  const isInitialLoading = ref(false);

  const hasMore = computed(() => !!news.value.pagination.next_page);

  const fetchNews = async (isInitial = true) => {
    const nextPage = news.value.pagination.next_page;
    if (!isInitial && !nextPage) return;

    isLoading.value = true;
    isInitialLoading.value = isInitial;

    try {
      const { data } = await getNews({
        page: isInitial ? 1 : nextPage!,
        page_size: pageSize,
      });

      if (isInitial) {
        news.value = data;
      } else {
        news.value.results.push(...data.results);
        news.value.pagination = data.pagination;
      }
    } catch {
      if (isInitial) {
        news.value = { results: [], pagination: emptyPagination() };
      }
    } finally {
      isLoading.value = false;
      isInitialLoading.value = false;
    }
  };

  const loadMore = () => fetchNews(false);

  onMounted(() => {
    fetchNews();
  });

  return {
    news,
    isLoading,
    isInitialLoading,
    hasMore,
    fetchNews,
    loadMore,
  };
};
