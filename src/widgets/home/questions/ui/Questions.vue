<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Btn, Icon, Collapse } from "@/shared/ui";
import { FAQ_ITEMS } from "@/shared/config/faq";

const router = useRouter();
</script>

<template>
  <div class="py-10 lg:py-15">
    <div
      class="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between mb-8 lg:mb-10"
    >
      <h1
        class="text-3xl leading-9 md:text-5xl md:leading-14 font-semibold tracking-[1.5%]"
      >
        {{ $t('home.questionsTitle') }}
      </h1>
      <div class="flex flex-wrap items-center gap-5 md:gap-10 shrink-0">
        <Btn color="underline">{{ $t('home.contactUs') }}</Btn>
        <Btn @click="router.push({ name: 'questions' })">
          {{ $t('home.allQuestions') }} <Icon name="arrows" class="size-6 rotate-180" />
        </Btn>
      </div>
    </div>
    <div class="bg-dark h-px w-full"></div>
    <div v-for="item in FAQ_ITEMS" :key="item.question">
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
</template>
