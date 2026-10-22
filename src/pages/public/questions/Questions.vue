<script lang="ts" setup>
import { Collapse } from "@/shared/ui";
import { FAQ_ITEMS } from "@/shared/config/faq";

const half = Math.ceil(FAQ_ITEMS.length / 2);
const columns = [FAQ_ITEMS.slice(0, half), FAQ_ITEMS.slice(half)];
</script>

<template>
  <div class="py-10 lg:py-15 grid grid-cols-1 lg:grid-cols-2 lg:gap-10">
    <div v-for="(column, index) in columns" :key="index">
      <!-- On mobile the columns stack: avoid a doubled divider between them -->
      <div
        class="bg-dark h-px w-full"
        :class="{ 'hidden lg:block': index > 0 }"
      ></div>
      <div v-for="item in column" :key="item.question">
        <Collapse class="px-1 md:px-5">
          <template #title>
            <h2>
              {{ $t(item.question) }}
            </h2>
          </template>
          <template #content>
            <p>
              {{ $t(item.answer) }}
            </p>
          </template>
        </Collapse>
        <div class="bg-dark h-px w-full"></div>
      </div>
    </div>
  </div>
</template>
