<script lang="ts" setup>
import { Btn, Icon, Loader } from "@/shared/ui";
import NewsSlider from "./NewsSlider.vue";
import PartNews from "./PartNews.vue";
import { useHomeNewsWidget } from "../model/useHomeNewsWidget";

const {
  items,
  sliderItems,
  cardItems,
  listItems,
  isInitialLoading,
  openNews,
  openAllNews,
} = useHomeNewsWidget();
</script>

<template>
  <div class="py-10 lg:py-15 space-y-8 lg:space-y-10">
    <div
      class="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between"
    >
      <h1
        class="text-3xl leading-9 md:text-5xl md:leading-14 font-semibold tracking-[1.5%]"
      >
        {{ $t('home.newsTitle') }}
      </h1>
      <Btn class="shrink-0 whitespace-nowrap" @click="openAllNews"
        >{{ $t('home.allNews') }} <Icon name="arrows" class="size-6 rotate-180"
      /></Btn>
    </div>
    <Loader :is-loading="isInitialLoading" :data="items">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <!-- Большая карточка-слайдер слева -->
        <NewsSlider
          class="lg:col-span-2 cursor-pointer"
          :news-items="sliderItems"
          @select="openNews"
        />

        <!-- Две маленькие карточки -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-[18px]">
          <div
            v-for="item in cardItems"
            :key="item.slug"
            class="relative overflow-hidden rounded-[20px] min-h-[191px] shadow-lg cursor-pointer bg-secondary-200 bg-cover bg-center"
            :style="item.image ? { backgroundImage: `url(${item.image})` } : {}"
            @click="openNews(item)"
          >
            <div
              class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"
            ></div>

            <div class="absolute inset-0 p-4 flex items-end">
              <div class="text-white">
                <p class="text-sm font-medium leading-5 line-clamp-2">
                  {{ item.title }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Правая часть -->
        <div>
          <!-- Список новостей -->
          <PartNews
            v-for="item in listItems"
            :key="item.slug"
            :news-item="item"
            class="cursor-pointer"
            @click="openNews(item)"
          />
        </div>
      </div>
    </Loader>
  </div>
</template>
