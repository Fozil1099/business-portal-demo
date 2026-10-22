<script lang="ts" setup>
import { computed } from "vue";
import { Loader, RichText } from "@/shared/ui";
import { useNewsDetail } from "@/features/news";
import { formatDateTime } from "@/shared/utils/formatter";

interface Props {
  slug: string;
}

const props = defineProps<Props>();

const { article, isLoading } = useNewsDetail(() => props.slug);

const loaderData = computed(() => (article.value ? [article.value] : []));
</script>

<template>
  <div class="py-10 lg:py-15">
    <Loader :is-loading="isLoading" :data="loaderData">
      <div
        v-if="article"
        class="grid grid-cols-1 gap-8 lg:gap-10"
        :class="{ 'lg:grid-cols-2': article.cover }"
      >
        <div class="space-y-7">
          <h1
            class="text-2xl leading-8 md:text-[28px] md:leading-9 font-semibold tracking-[1.5%]"
          >
            {{ article.title }}
          </h1>
          <RichText :html="article.body" />
          <p class="text-sm text-gray-500">
            {{ formatDateTime(article.published_at) }}
          </p>
        </div>
        <div
          v-if="article.cover"
          class="order-first lg:order-last overflow-hidden rounded-[24px] lg:rounded-[30px] max-h-[394px] shadow-lg bg-secondary-200"
        >
          <img
            :src="article.cover"
            :alt="article.cover_alt || article.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </Loader>
  </div>
</template>
