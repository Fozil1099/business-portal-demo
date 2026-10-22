<script lang="ts" setup>
import { Btn, Icon } from "@/shared/ui";
import { ref } from "vue";

interface Props {
  data: {
    title: string;
    description: string;
    range_rating: string;
  };
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: "openDetail", data: Props["data"]): void;
}>();
const isMouseOver = ref(false);

const handleMouseOver = () => {
  isMouseOver.value = true;
};

const handleMouseLeave = () => {
  isMouseOver.value = false;
};

const openDetail = () => {
  emit("openDetail", props.data);
};
</script>

<template>
  <div
    class="border-[6px] md:border-10 border-white/25 rounded-[26px] md:rounded-[30px] backdrop-blur-[20px] h-full"
  >
    <div
      class="rounded-[20px] p-4 md:p-5 space-y-4 md:space-y-5 h-full flex flex-col services__card"
      :class="{
        bg__primary__gradient: isMouseOver,
        'bg-white': !isMouseOver,
      }"
      @mouseover="handleMouseOver"
      @mouseleave="handleMouseLeave"
    >
      <h3
        class="font-semibold text-xl leading-7 md:text-[28px] md:leading-9 tracking-[1.5%]"
        :class="{
          'text-white': isMouseOver,
          'text-black': !isMouseOver,
        }"
      >
        {{ data.title }}
      </h3>
      <p
        v-if="data.description"
        class="text-base font-medium leading-5 tracking-[1.5%]"
        :class="{
          'text-white': isMouseOver,
          'text-black': !isMouseOver,
        }"
      >
        {{
          data.description.length > 110
            ? data.description.slice(0, 110) + "..."
            : data.description
        }}
      </p>
      <div class="flex items-center justify-between gap-3 mt-auto">
        <span
          class="text-base md:text-[20px] font-semibold leading-[100%] tracking-[1.5%]"
          :class="{
            'text-white': isMouseOver,
            'text-black': !isMouseOver,
          }"
          >{{ data.range_rating }} {{ $t("home.points") }}</span
        >
        <Btn :color="isMouseOver ? 'gray' : 'primary'" @click="openDetail">
          {{ $t("home.details") }}
          <Icon name="arrows" class="size-6 rotate-180" />
        </Btn>
      </div>
    </div>
  </div>
</template>
