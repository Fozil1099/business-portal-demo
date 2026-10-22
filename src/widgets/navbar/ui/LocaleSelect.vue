<script lang="ts" setup>
import { Dropdown } from "@/shared/ui";
import i18n from "@/app/providers/i18n";
import { useI18n } from "vue-i18n";
import ruFlag from "@/shared/assets/images/flags/ru.png";
import uzFlag from "@/shared/assets/images/flags/uz.svg";
import { useLocale } from "@/shared/model/useLocale";

const { locale } = useI18n();
const { saveLocale } = useLocale();

interface Locale {
  title: string;
  key: string;
  flag: string;
}

const localesList: Locale[] = [
  {
    title: "Rus",
    key: "ru",
    flag: ruFlag,
  },
  {
    title: "Uzb",
    key: "uz",
    flag: uzFlag,
  },
];

const onChangeLocale = (lang: string, handleDropdown: () => void) => {
  i18n.global.locale.value = lang;
  saveLocale(lang);
  localStorage.setItem("last-locale", lang);
  handleDropdown();
};
</script>

<template>
  <Dropdown position="bottom-center">
    <template #button="{ actions }">
      <button
        class="py-2 px-2.5 lg:py-2.5 lg:px-4 flex items-center justify-center rounded-xl gap-2 bg-secondary-300"
        @click="actions.handleDropdown"
      >
        <span class="uppercase text-base text-white">
          <img
            :src="localesList.find((item) => item.key === locale)?.flag"
            alt=""
            class="w-5 h-5"
          />
        </span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.75 0.75L4.75 4.75L8.75 0.75"
            stroke="#999999"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </template>
    <template #body="{ actions }">
      <div class="flex flex-col">
        <div
          v-for="item in localesList"
          :key="item.key"
          class="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-secondary-200 rounded-xl transition-colors"
          @click="onChangeLocale(item.key, actions.handleDropdown)"
        >
          <img :src="item.flag" alt="" class="w-5 h-5" />
          <span class="text-sm">{{ item.title }}</span>
        </div>
      </div>
    </template>
  </Dropdown>
</template>
