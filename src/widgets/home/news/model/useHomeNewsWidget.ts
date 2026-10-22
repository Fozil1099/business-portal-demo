import { computed } from "vue";
import { useRouter } from "vue-router";
import { useNews } from "@/features/news";
import { formatDateTime } from "@/shared/utils/formatter";

export interface HomeNewsItem {
  slug: string;
  title: string;
  image: string;
  date: string;
}

const SLIDER_COUNT = 3;
const CARDS_COUNT = 2;
const LIST_COUNT = 4;

export const useHomeNewsWidget = () => {
  const { news, isInitialLoading } = useNews(
    SLIDER_COUNT + CARDS_COUNT + LIST_COUNT,
  );
  const router = useRouter();

  const items = computed<HomeNewsItem[]>(() =>
    news.value.results.map((item) => ({
      slug: item.slug,
      title: item.title,
      image: item.cover ?? "",
      date: formatDateTime(item.published_at),
    })),
  );

  // Самые свежие — в слайдер, следующие — в карточки, остальные — в список
  const sliderItems = computed(() => items.value.slice(0, SLIDER_COUNT));
  const cardItems = computed(() =>
    items.value.slice(SLIDER_COUNT, SLIDER_COUNT + CARDS_COUNT),
  );
  const listItems = computed(() =>
    items.value.slice(SLIDER_COUNT + CARDS_COUNT),
  );

  const openNews = (item: HomeNewsItem) => {
    router.push({ name: "news-details", params: { id: item.slug } });
  };

  const openAllNews = () => {
    router.push({ name: "news" });
  };

  return {
    items,
    sliderItems,
    cardItems,
    listItems,
    isInitialLoading,
    openNews,
    openAllNews,
  };
};
