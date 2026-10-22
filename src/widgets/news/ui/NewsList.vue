<script lang="ts" setup>
import { Btn, Loader } from "@/shared/ui";
import { useNews } from "@/features/news";
import NewsCard from "./NewsCard.vue";

const { news, isLoading, isInitialLoading, hasMore, loadMore } =
  useNews();
</script>

<template>
  <div class="py-10 lg:py-15 space-y-7">
    <Loader
      :is-loading="isInitialLoading"
      :data="news.results"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <NewsCard
          v-for="item in news.results"
          :key="item.uuid"
          :news-item="item"
        />
      </div>
    </Loader>
    <div v-if="hasMore" class="w-full">
      <Btn
        color="gray-light"
        class="w-full"
        :disabled="isLoading"
        @click="loadMore"
      >
        {{ $t('common.showMore') }}
      </Btn>
    </div>
  </div>
</template>
