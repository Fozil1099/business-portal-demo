<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Icon } from "@/shared/ui";
import type { NewsListItem } from "@/features/news";
import { formatDateTime } from "@/shared/utils/formatter";

interface Props {
  newsItem: NewsListItem;
}

const props = defineProps<Props>();
const router = useRouter();

const openNewsDetails = () => {
  router.push({
    name: "news-details",
    params: {
      id: props.newsItem.slug,
    },
  });
};
</script>

<template>
  <div class="space-y-3 cursor-pointer" @click="openNewsDetails">
    <div class="rounded-[20px] max-h-[196px] overflow-hidden">
      <img
        v-if="newsItem.cover"
        :src="newsItem.cover"
        :alt="newsItem.cover_alt || newsItem.title"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="h-[196px] bg-secondary-200 flex items-center justify-center"
      >
        <Icon name="camera" class="size-12 text-secondary-300" />
      </div>
    </div>
    <div class="space-y-2">
      <h3 class="text-xl font-semibold leading-6 text-black line-clamp-2">
        {{ newsItem.title }}
      </h3>
      <p class="text-sm text-gray-500 line-clamp-2">
        {{ formatDateTime(newsItem.published_at) }}
      </p>
    </div>
  </div>
</template>
