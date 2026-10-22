<script lang="ts" setup>
import { Modal } from ".";

interface Props {
  title?: string;
  points?: number;
  treesCount?: number;
}

withDefaults(defineProps<Props>(), {
  title: "Поздравляем!",
  points: 100,
  treesCount: 1,
});
</script>

<template>
  <Modal
    id="congratulation-modal"
    :title="title"
    size="max-w-lg"
    footerHidden
  >
    <div class="mt-10 space-y-3">
      <img
        src="@/shared/assets/images/congratulation.svg"
        class="w-full"
        alt=""
      />
      <p class="text-xl font-normal leading-6">
        <slot>
          Вы сделали доброе дело — посадили
          <span class="text__primary__gradient">{{ treesCount }}</span>
          дерево(ев), и природа уже благодарит вас за вклад в будущее. Вам
          начислено
          <span class="text__primary__gradient">{{ points }} баллов</span>!
        </slot>
      </p>
    </div>
  </Modal>
</template>
