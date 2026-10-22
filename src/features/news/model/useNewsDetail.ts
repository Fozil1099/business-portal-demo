import { ref, toValue, watch, type MaybeRefOrGetter } from "vue";
import { getNewsArticle } from "../api/news";
import type { NewsArticle } from "../api/types";

export const useNewsDetail = (slug: MaybeRefOrGetter<string>) => {
  const article = ref<NewsArticle | null>(null);
  const isLoading = ref(true);

  const fetchArticle = async () => {
    const currentSlug = toValue(slug);
    if (!currentSlug) return;

    isLoading.value = true;

    try {
      const { data } = await getNewsArticle(currentSlug);
      article.value = data;
    } catch {
      article.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  watch(() => toValue(slug), fetchArticle, { immediate: true });

  return {
    article,
    isLoading,
    fetchArticle,
  };
};
