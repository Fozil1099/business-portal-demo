<script
  lang="ts"
  setup
  generic="T extends { title?: string; image: string; date: string }"
>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

interface Props {
  newsItems: T[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: "select", item: T): void;
}>();

</script>

<template>
  <swiper
    :spaceBetween="30"
    :effect="'fade'"
    :navigation="true"
    :pagination="{
      clickable: true,
    }"
    :modules="[Pagination]"
    class="mySwiper"
  >
    <swiper-slide v-for="item in props.newsItems" @click="emit('select', item)">
      <div
        class="relative overflow-hidden rounded-[24px] lg:rounded-[30px] min-h-[240px] md:min-h-[320px] max-h-[400px] shadow-lg h-full bg-secondary-200 bg-cover bg-center"
        :style="item.image ? { backgroundImage: `url(${item.image})` } : {}"
      >
        <div
          class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"
        ></div>

        <div
          v-if="item?.title"
          class="absolute inset-0 p-5 pb-10 md:p-8 flex flex-col justify-end"
        >
          <div class="text-white space-y-3">
            <h3 class="text-xl leading-7 md:text-2xl md:leading-8 font-semibold">
              {{ item.title }}
            </h3>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<style lang="scss">
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
.swiper-pagination-bullet {
  background: #ffffff;
}
</style>
